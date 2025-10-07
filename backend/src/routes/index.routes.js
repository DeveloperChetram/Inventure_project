import express from "express";
import { indexContoller } from "../controllers/index.controller.js";

export const indexRouter = express.Router();

indexRouter.get("/",indexContoller);