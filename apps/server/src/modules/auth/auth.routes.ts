import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { zodMiddleware } from "../../middlewares/zod.middleware";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginSchema, RegsiterSchema } from "./auth.schema";

export const authRoutes = Router();
const authController = new AuthController(new AuthService());

authRoutes.post(
  "/register",
  zodMiddleware(RegsiterSchema),
  authController.register,
);
authRoutes.post("/login", zodMiddleware(LoginSchema), authController.login);
authRoutes.post("/logout", authMiddleware, authController.logout);
