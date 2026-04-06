import { Models } from "node-appwrite";
import { storage } from "../../config/appwrite";
import { env } from "../../config/env";

export class StorageService {
  private storage = storage;
  constructor() {}

  async upload(
    fileId: string,
    inputImage: Express.Multer.File,
  ): Promise<Models.File> {
    return await this.storage.createFile({
      bucketId: env.APPWRITE_BUCKET_ID,
      fileId,
      file: inputImage.buffer as unknown as File,
    });
  }
}
