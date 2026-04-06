import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";
import { apiResponse } from "../utils/apiResponse";
import { env } from "../config/env";
import { ERROR_CODES } from "../constants";
import { HttpException } from "../utils/errors";

const formatZodError = (issues: ZodIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path[0],
    message: issue.message,
  }));
};

export const appErrorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return apiResponse(res, {
      success: false,
      status: 400,
      message: "Validation Error",
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        details: formatZodError(err.issues),
      },
    });
  }

  if (err instanceof HttpException) {
    return apiResponse(res, err.toResponse());
  }
  console.log(err);
  apiResponse(res, {
    success: false,
    status: 500,
    message: "Something went wrong",
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      details: env.NODE_ENV === "development" ? err : undefined,
    },
  });
};
