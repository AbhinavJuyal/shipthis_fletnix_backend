import express, { type Router } from "express";
import { authController } from "./authController";

export const authRouter: Router = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
