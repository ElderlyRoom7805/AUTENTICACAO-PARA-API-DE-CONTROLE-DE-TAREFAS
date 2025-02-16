"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoesCategoryExist = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class DoesCategoryExist {
    static async execute(req, res, next) {
        const find = await prisma_1.prisma.category.findFirst({
            where: { id: Number(req.params.id) },
        });
        if (!find) {
            throw new appError_1.AppError(404, "Category not found");
        }
        next();
    }
}
exports.DoesCategoryExist = DoesCategoryExist;
