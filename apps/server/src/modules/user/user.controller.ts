import { Request, Response } from "express";
import { apiResponse } from "../../utils/apiResponse";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  findById = async (req: Request, res: Response) => {
    const user = await this.userService.findById(this.getUserId(req));
    return apiResponse(res, {
      status: 200,
      data: user,
    });
  };
}
