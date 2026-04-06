import { Response, NextFunction, Request } from "express";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from "../../constants";
import { BadRequestException } from "../../utils/errors";
import { ProjectService } from "../project/project.service";

export const validateImageUpload = (
  req: any,
  res: Response,
  next: NextFunction,
): void => {
  const uploadedFile = req?.file;

  if (!uploadedFile) {
    throw new BadRequestException("File is required. Please upload a file.");
  }

  if (!ALLOWED_MIME_TYPES.includes(uploadedFile.mimetype)) {
    throw new BadRequestException(
      "Invalid file type. Only PNG, JPEG, JPG, and GIF images are allowed.",
    );
  }

  if (uploadedFile.size > MAX_FILE_SIZE) {
    const maxSizeMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(2);
    throw new BadRequestException(`File size exceeds ${maxSizeMB} MB.`);
  }

  next();
};

const projectService = new ProjectService();

export const uploadKeyGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers?.["x-upload-key"] as string;

  if (!apiKey) {
    throw new BadRequestException("Upload key is required.");
  }

  const projectId = await projectService.verifyKey(apiKey);

  if (!projectId) {
    throw new BadRequestException("Invalid upload key.");
  }

  (req as any)?.projctId;

  next();
};
