"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoesBodyCategoryExist = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class DoesBodyCategoryExist {
    static async execute(req, res, next) {
        if (req.body.categoryId) {
            const find = await prisma_1.prisma.category.findFirst({
                where: { id: Number(req.body.categoryId) },
            });
            if (!find) {
                throw new appError_1.AppError(404, "Category not found");
            }
        }
        next();
    }
}
exports.DoesBodyCategoryExist = DoesBodyCategoryExist;
