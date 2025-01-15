import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { browserRouter } from "@/api/browse/browseRouter";
import { authRouter } from "@/api/auth/authRouter";
import { AuthMiddleware } from "./middlewares/authMiddleware";
import morgan from "morgan";
import { env } from "./common/utils/envConfig";
import { openAPIRouter } from './api-docs/openAPIRouter';

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(helmet());
app.use(morgan("combined"));

app.use("/browse", AuthMiddleware.auth, browserRouter);
app.use("/auth", authRouter);
app.get("/health", (_req, res) => {
  res.send("ok").status(200);
});

app.use(openAPIRouter);

export default app;
