import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", authMiddleware, userRoutes);
