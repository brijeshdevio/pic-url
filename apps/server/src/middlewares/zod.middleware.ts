import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function zodMiddleware<T extends z.ZodTypeAny>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      next(err);
    }
  };
}
