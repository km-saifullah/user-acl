import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import categoryRouter from "./routes/commonRoutes.js";

configDotenv();
mongoose.connect(process.env.DATABASE_URL);

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/", authRouter);
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/", categoryRouter);

app.listen(process.env.PORT || 8000, () =>
  console.log("Server is runing on port:" + process.env.PORT)
);
