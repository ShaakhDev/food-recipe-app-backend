const Recipe = require("../models/recipe.model");
const Comment = require("../models/comment.model");

const GetRecipes = async (req, res) => {
  try {
    const { category } = req.query;
    // recipe's category is array type so we can use $in operator to find recipes by category name
    if (category) {
      const recipes = await Recipe.find({ category: { $in: [category] } });
      return res.json(recipes);
    }
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ message: "error get recipes", error });
  }
};

const GetNewRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(4);
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ message: "error get new recipes", error });
  }
};

const GetRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: "error get recipe", error });
  }
};

const CreateRecipe = async (req, res) => {
  try {
    // if one of the fields is missing, return an error message with specific field name that is missing and status code 400
    const {
      title,
      description,
      time,
      ingredients,
      instructions,
      image,
      category,
    } = req.body;
    if (!title) return res.status(400).json({ message: "title is required" });
    if (!description)
      return res.status(400).json({ message: "description is required" });
    if (!time) return res.status(400).json({ message: "time is required" });
    if (!ingredients)
      return res.status(400).json({ message: "ingredients is required" });
    if (!instructions)
      return res.status(400).json({ message: "instructions is required" });
    if (!image) return res.status(400).json({ message: "image is required" });
    if (!category)
      return res.status(400).json({ message: "category is required" });

    const recipe = await Recipe({ ...req.body, user: req.user._id });
    await recipe.save();

    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "error create recipe", error });
  }
};

const WriteComment = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
        return res.status(404).json({ message: "recipe not found" });
        }
    
        const comment = await Comment.create({ ...req.body, user: req.user._id });
        recipe.comments.push(comment._id);
        await recipe.save();
    
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: "error write comment", error });
    }
}


const UpdateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }

    await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ message: "recipe updated" });
  } catch (error) {
    res.status(400).json({ message: "error update recipe", error });
  }
};

const DeleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "recipe deleted" });
  } catch (error) {
    res.status(400).json({ message: "error delete recipe", error });
  }
};

module.exports = {
  GetRecipes,
  GetNewRecipes,
  GetRecipe,
  CreateRecipe,
  UpdateRecipe,
    WriteComment,
  DeleteRecipe,
};
