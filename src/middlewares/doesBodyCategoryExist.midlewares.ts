import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class DoesBodyCategoryExist {
  static async execute(req: Request, res: Response, next: NextFunction) {
    if (req.body.categoryId) {
      const find = await prisma.category.findFirst({
        where: { id: Number(req.body.categoryId) },
      });

      if (!find) {
        throw new AppError(404, "Category not found");
      }
    }
    next();
  }
}
