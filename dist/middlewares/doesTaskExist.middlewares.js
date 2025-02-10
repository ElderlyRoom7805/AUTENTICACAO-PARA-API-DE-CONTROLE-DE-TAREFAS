"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoesTaskExist = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class DoesTaskExist {
    static async execute(req, res, next) {
        const find = await prisma_1.prisma.task.findFirst({
            where: { id: Number(req.params.id) },
        });
        if (!find) {
            throw new appError_1.AppError(404, "Task not found");
        }
        next();
    }
}
exports.DoesTaskExist = DoesTaskExist;
