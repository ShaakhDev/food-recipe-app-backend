const Food = require("../models/food.model");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

// Get all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new food
const addFood = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get food by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    // Check if food exists and has enough quantity
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    if (food.availableCount < quantity) {
      return res.status(400).json({ message: "Not enough items in stock" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.foodId.toString() === foodId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated

    // Get user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total and prepare order items
    let totalAmount = 0;
    const orderItems = [];
    let maxDeliveryTime = 0;

    for (const item of cart.items) {
      const food = await Food.findById(item.foodId);
      if (!food) {
        return res
          .status(404)
          .json({ message: `Food item ${item.foodId} not found` });
      }
      if (food.availableCount < item.quantity) {
        return res.status(400).json({
          message: `Not enough ${food.name} in stock. Available: ${food.availableCount}`,
        });
      }

      // Update food available count
      food.availableCount -= item.quantity;
      await food.save();

      orderItems.push({
        foodId: food._id,
        quantity: item.quantity,
        price: food.price,
      });

      totalAmount += food.price * item.quantity;
      maxDeliveryTime = Math.max(maxDeliveryTime, food.timeToDelivery);
    }

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      deliveryTime: new Date(Date.now() + maxDeliveryTime * 60000), // Convert minutes to milliseconds
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find cart and populate food details
    const cart = await Cart.findOne({ userId })
      .populate({
        path: 'items.foodId',
        select: 'name description image price timeToDelivery availableCount'
      });

    if (!cart) {
      // If no cart exists, return an empty cart structure
      return res.status(200).json({
        items: [],
        totalItems: 0,
        totalAmount: 0
      });
    }

    // Calculate total amount and items
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + (item.foodId.price * item.quantity);
    }, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.status(200).json({
      items: cart.items,
      totalItems,
      totalAmount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Add multiple foods
const addMultipleFoods = async (req, res) => {
  try {
    const { foods } = req.body;

    if (!Array.isArray(foods) || foods.length === 0) {
      return res.status(400).json({ 
        message: "Please provide an array of foods" 
      });
    }

    // Validate each food item
    for (const food of foods) {
      const { name, description, image, price, timeToDelivery, availableCount } = food;
      if (!name || !description || !image || !price || !timeToDelivery || !availableCount) {
        return res.status(400).json({ 
          message: "Each food item must have name, description, image, price, timeToDelivery, and availableCount" 
        });
      }
    }

    // Insert all foods
    const savedFoods = await Food.insertMany(foods);
    
    res.status(201).json({
      message: `Successfully added ${savedFoods.length} foods`,
      foods: savedFoods
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's order history
const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    // Build query
    const query = { userId };
    if (status) {
      query.status = status;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);

    // Find orders with pagination and populate food details
    const orders = await Order.find(query)
      .populate({
        path: 'items.foodId',
        select: 'name description image price'
      })
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(parseInt(limit));

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalOrders,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFoods,
  addFood,
  getFoodById,
  addToCart,
  createOrder,
  addMultipleFoods,
  getUserCart,
  getOrderHistory,
};
