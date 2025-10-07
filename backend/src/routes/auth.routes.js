import express from "express";
import { registerContoller } from "../controllers/auth.controller.js";
// import { Contoller } from "../controllers/index.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", registerContoller);

