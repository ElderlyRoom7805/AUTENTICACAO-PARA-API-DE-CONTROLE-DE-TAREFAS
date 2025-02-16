"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTheCategoryOwner = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class isTheCategoryOwner {
    static async execute(req, res, next) {
        const userId = res.locals.decode.id;
        const categoryId = req.params.id;
        const category = await prisma_1.prisma.category.findFirst({
            where: { id: Number(categoryId) },
        });
        if (category?.userId != userId) {
            throw new appError_1.AppError(403, "This user is not the category owner");
        }
        return next();
    }
}
exports.isTheCategoryOwner = isTheCategoryOwner;
