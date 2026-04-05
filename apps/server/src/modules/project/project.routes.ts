import { Router } from "express";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { zodMiddleware } from "../../middlewares/zod.middleware";
import { CreateProjectSchema, UpdateProjectSchema } from "./project.schema";

export const projectRoutes = Router();
const projectController = new ProjectController(new ProjectService());

projectRoutes.post(
  "/",
  zodMiddleware(CreateProjectSchema),
  projectController.create,
);
projectRoutes.get("/", projectController.findAll);
projectRoutes.get("/:id", projectController.findOne);
projectRoutes.patch(
  "/:id",
  zodMiddleware(UpdateProjectSchema),
  projectController.update,
);
projectRoutes.delete("/:id", projectController.delete);
