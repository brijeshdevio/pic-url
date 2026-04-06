import { Router } from "express";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

export const imageRoutes = Router();

const imageController = new ImageController(new ImageService());
export const uploadImage = imageController.upload;
