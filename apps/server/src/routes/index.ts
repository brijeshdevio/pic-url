import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { projectRoutes } from "../modules/project/project.routes";
import { imageRoutes, uploadImage } from "../modules/image/image.routes";
import { upload } from "../config/multer";
import {
  uploadKeyGuard,
  validateImageUpload,
} from "../modules/image/image.middleware";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", authMiddleware, userRoutes);
routes.use("/projects", authMiddleware, projectRoutes);
routes.use("/images", authMiddleware, imageRoutes);
routes.post(
  "/upload",
  upload.single("file"),
  validateImageUpload,
  uploadKeyGuard,
  uploadImage,
);
