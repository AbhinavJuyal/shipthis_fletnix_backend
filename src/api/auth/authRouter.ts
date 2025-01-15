import express, { type Router } from "express";
import { authController } from "./authController";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { AuthSchema } from "./authModel";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.register("Auth", AuthSchema);

authRegistry.registerPath({
	method: "post",
	path: "/auth/login",
	tags: ["Auth"],
	responses: createApiResponse(AuthSchema, "Success"),
});

authRouter.post("/login", authController.login);

authRegistry.registerPath({
	method: "post",
	path: "/auth/signup",
	tags: ["Auth"],
	responses: createApiResponse(AuthSchema, "Success"),
});

authRouter.post("/signup", authController.signup);
