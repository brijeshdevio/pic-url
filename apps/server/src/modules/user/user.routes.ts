import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export const userRoutes = Router();
const usercontroller = new UserController(new UserService());

userRoutes.get("/profile", usercontroller.findById);
