const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const authRouter = require("./routes/auth.router");

dotenv.config();
const app = express();
const mongoUri = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/auth", authRouter);
// app.use(router);

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Rasm yuklash endpointi
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Static fayllarni xizmat qilish
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
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
  });