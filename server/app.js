import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import categoryRoutes from "./routes/categories.js";
import upload from "./middleware/upload.js";
import dotenv from "dotenv";
import morgan from 'morgan';
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static("./uploads"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

// routes
app.use("/auth", userRoutes);
app.use("/category", categoryRoutes);
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file.filename);
});
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));



