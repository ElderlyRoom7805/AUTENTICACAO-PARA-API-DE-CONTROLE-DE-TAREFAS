import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class handleErrors {
  static execute(
    error: Error,
    req: Request,
    res: Response,
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: error.message });
    } else {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}