import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined ? { data } : {})
  });
}

export const sendError = (res: Response, message: string, statusCode: number): void => {
  res.status(statusCode).json({
    success: false,
    message
  });
}
