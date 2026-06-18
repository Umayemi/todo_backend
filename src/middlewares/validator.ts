import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const bodyValidator =
  (schema:  z.ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(
        req.body
      );

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

  export const paramsValidator  =
  (schema:  z.ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse( req.params);

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

  export const queryValidator =
  (schema:  z.ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = schema.parse( req.query);

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