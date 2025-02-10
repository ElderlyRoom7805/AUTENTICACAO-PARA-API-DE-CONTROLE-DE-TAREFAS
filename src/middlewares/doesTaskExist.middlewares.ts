import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class DoesTaskExist {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const find = await prisma.task.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!find) {
      throw new AppError(404, "Task not found");
    }

    next();
  }
}
