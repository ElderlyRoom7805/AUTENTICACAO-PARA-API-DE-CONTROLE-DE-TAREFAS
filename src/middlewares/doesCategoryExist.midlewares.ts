import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class DoesCategoryExist {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const find = await prisma.category.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!find) {
      throw new AppError(404, "Category not found");
    }

    next();
  }
}
