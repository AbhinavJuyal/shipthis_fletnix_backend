import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { browserRouter } from "@/api/browse/browseRouter";
import { authRouter } from "./api/auth/authRouter";
import dotenv from "dotenv";
import { AuthMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/browse", AuthMiddleware.auth, browserRouter);
app.use("/auth", authRouter);
app.get("/health", (_req, res) => {
  res.send("ok").status(200);
});

export default app;
