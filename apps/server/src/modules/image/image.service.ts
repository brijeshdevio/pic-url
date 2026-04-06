import { StorageService } from "../storage/storage.service";
import { prisma } from "../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PRISMA_CODES } from "../../constants";
import {
  ForbiddenException,
  InternalServerErrorException,
} from "../../utils/errors";
import { randomString } from "../../lib/crypto";

const storageService = new StorageService();

export class ImageService {
  private prefix = "img_";
  constructor() {}

  upload = async (projectId: string, file: Express.Multer.File) => {
    try {
      const slug = this.prefix + randomString(6);
      const uploadedImage = await storageService.upload(slug, file);
      await prisma.image.create({
        data: {
          name: uploadedImage.name,
          storageId: uploadedImage.$id,
          mimeType: uploadedImage.mimeType,
          size: uploadedImage.sizeOriginal,
          projectId: projectId,
          slug,
        },
      });
      return {
        id: slug,
        name: uploadedImage.name,
        mimeType: uploadedImage.mimeType,
        size: uploadedImage.sizeOriginal,
        createdAt: uploadedImage.$createdAt,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException(
            `You don't have access to this upload api key.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  };
}
