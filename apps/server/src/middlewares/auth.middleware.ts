import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../lib/jwt";
import { UnauthorizedException } from "../utils/errors";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.["accessToken"];

  if (!token) {
    throw new UnauthorizedException(`Missing access token`);
  }

  try {
    const payload = verifyJwt(token) as { sub: string };

    (req as any).user = {
      id: payload.sub,
    };
    next();
  } catch {
    throw new UnauthorizedException(`Invalid access token`);
  }
}
