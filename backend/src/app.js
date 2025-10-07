import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRouter } from "./routes/index.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { productRouter } from "./routes/product.routes.js";

dotenv.config();

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);