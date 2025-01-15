import express, { type Router } from "express";
import { browserController } from "./browseController";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { MediaSchema } from "prisma/generated/zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
	AuthHeaders,
	GetAllPagedQuery,
	GetAllPagedResponse,
	GetByIdParam,
} from "./browseModel";
import { z } from "zod";

export const browseRegistry = new OpenAPIRegistry();
export const browserRouter: Router = express.Router();

browseRegistry.register("Browse", MediaSchema);

browseRegistry.registerPath({
	method: "get",
	path: "/browse",
	tags: ["Browse"],
	request: {
		query: GetAllPagedQuery,
		headers: AuthHeaders,
	},
	responses: createApiResponse(GetAllPagedResponse, "Success"),
});

browserRouter.get("/", browserController.getTitlesPaged);

browseRegistry.registerPath({
	method: "get",
	path: "/browse/:id",
	tags: ["Browse"],
	request: {
		params: GetByIdParam,
		headers: AuthHeaders,
	},
	responses: createApiResponse(MediaSchema, "Success"),
});

browserRouter.get("/:id", browserController.getTitleById);
