import { Request, Response } from "express";
import { apiResponse } from "../../utils/apiResponse";
import { clearCookie, setCookie } from "../../utils/cookie";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const data = await this.authService.register({ name, email, password });
    return apiResponse(res, {
      status: 201,
      data,
      message: "Registration successful",
    });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const tokens = await this.authService.login({ email, password });
    setCookie(res, "accessToken", tokens.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return apiResponse(res, {
      status: 200,
      message: "Login successful",
    });
  };

  logout = async (req: Request, res: Response) => {
    clearCookie(res, "accessToken");
    return apiResponse(res, {
      status: 200,
      message: "Logout successful",
    });
  };
}
