import { Request, Response } from "express";
import { apiResponse } from "../../utils/apiResponse";
import { ProjectService } from "./project.service";

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  create = async (req: Request, res: Response) => {
    const { name, expireAt } = req.body;
    const data = await this.projectService.create(this.getUserId(req), {
      name,
      expireAt,
    });

    return apiResponse(res, {
      status: 201,
      data,
      message: "Project created successfully",
    });
  };

  findAll = async (req: Request, res: Response) => {
    const data = await this.projectService.findAll(this.getUserId(req));
    return apiResponse(res, {
      data,
      status: 200,
    });
  };

  findOne = async (req: Request, res: Response) => {
    const id = req.params?.id as string;
    const data = await this.projectService.findOne(this.getUserId(req), id);
    return apiResponse(res, {
      data,
      status: 200,
    });
  };

  update = async (req: Request, res: Response) => {
    const id = req.params?.id as string;
    const { name } = req.body;
    const data = await this.projectService.update(this.getUserId(req), id, {
      name,
    });
    return apiResponse(res, {
      data,
      status: 200,
    });
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params?.id as string;
    await this.projectService.delete(this.getUserId(req), id);
    return apiResponse(res, {
      status: 200,
      message: "Project deleted successfully",
    });
  };
}
