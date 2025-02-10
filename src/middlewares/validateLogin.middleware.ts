import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import bcrypt from "bcrypt";

export class ValidateLogin {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const user = (await prisma.user.findFirst({
      where: { email: req.body.email },
    }));

    if (!user) {
      throw new AppError( 404, "User does not exist");
    }

    const compare = await bcrypt.compare(req.body.password, user?.password);

    if (!compare) {
      throw new AppError( 401, "Email and password do not match");
    }

    res.locals.user = user;

    next();
  }
}
