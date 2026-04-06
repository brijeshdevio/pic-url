import { Request, Response } from "express";
import { ImageService } from "./image.service";
import { apiResponse } from "../../utils/apiResponse";

export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  upload = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    const projectId = (req as any)?.projectId;
    const data = await this.imageService.upload(projectId, file);

    return apiResponse(res, {
      status: 201,
      message: "Image uploaded successfully",
      data,
    });
  };
}
