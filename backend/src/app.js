// import mongoose from "mongoose";
import express from "express";
import { indexRouter } from "../src/routes/index.routes.js";
import dotenv from "dotenv";
dotenv.config();

export const app = express();
//middlewares
app.use(express.json());

//Apis
app.use("/",indexRouter);