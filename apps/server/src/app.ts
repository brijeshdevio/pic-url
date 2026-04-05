import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { env } from "./config/env";
import { routes } from "./routes";
import { apiResponse } from "./utils/apiResponse";
import { ERROR_CODES } from "./constants";
import { appErrorMiddleware } from "./middlewares/appError.middleware";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.json({
    message: "Pic URL API",
    version: "1.0.0",
  });
});

app.get("/health", (_, res) => {
  res.send("OK");
});

app.use("/api", routes);

app.use("", (_, res) => {
  return apiResponse(res, {
    status: 404,
    message: "Route not found",
    error: {
      code: ERROR_CODES.NOT_FOUND,
      details: `Please check the route name and method.`,
    },
  });
});

app.use(appErrorMiddleware);

export default app;
