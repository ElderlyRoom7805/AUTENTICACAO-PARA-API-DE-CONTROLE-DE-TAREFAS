"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoesEmailExist = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class DoesEmailExist {
    static async execute(req, res, next) {
        const user = await prisma_1.prisma.user.findFirst({
            where: { email: req.body.email },
        });
        if (user) {
            throw new appError_1.AppError(409, "This email is already registered");
        }
        next();
    }
}
exports.DoesEmailExist = DoesEmailExist;
