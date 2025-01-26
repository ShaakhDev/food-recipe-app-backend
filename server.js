const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const authRouter = require("./routes/auth.router");
const recipeRouter = require("./routes/recipe.router");
const uploadRouter = require("./routes/upload.router");
const foodRouter = require("./routes/food.routes");
const swaggerDocs = require("./swagger");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();
const app = express();
const mongoUri = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", recipeRouter);
app.use("/api", foodRouter);
app.use("/api", protect, uploadRouter);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8080;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log("server running on port", PORT);
    });
    swaggerDocs(app, PORT);
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
  });
