import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { sendError } from "../utils/apiResponse";

export const notFoundHandler = (_req: Request, res: Response): void => {

  sendError(res, "Route not found", 404);
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    sendError(res, error.message, error.statusCode);
    return;
  }

  sendError(res, "Internal server error", 500);
}
