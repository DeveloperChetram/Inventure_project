// import mongoose from "mongoose";
import express from "express";
import { indexRouter } from "../src/routes/index.routes.js";
import { authRouter } from "../src/routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();


export const app = express();
//middlewares
app.use(express.json());

//Index Apis
app.use("/",indexRouter);

//auth Apis
app.use("/api/auth",authRouter);