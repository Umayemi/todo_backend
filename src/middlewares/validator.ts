import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validator =
  (schema:  z.ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    }catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({
          message: "Validation failed",
          errors: error.issues,
        });
      }

      return res.status(500).send({
        message: "Internal server error",
      });
    }
  };