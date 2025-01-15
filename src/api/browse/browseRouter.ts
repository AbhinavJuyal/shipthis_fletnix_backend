import express, { type Router } from "express";
import { browserController } from "./browseController";

export const browserRouter: Router = express.Router();

browserRouter.get("/", browserController.getTitlesPaged);
browserRouter.get("/:id", browserController.getTitleById);
