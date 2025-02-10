"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTheTaskOwner = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class isTheTaskOwner {
    static async execute(req, res, next) {
        const userId = res.locals.decode.id;
        const taskId = req.params.id;
        const task = await prisma_1.prisma.task.findFirst({
            where: { id: Number(taskId) },
        });
        if (task?.userId != userId) {
            throw new appError_1.AppError(403, "This user is not the task owner");
        }
        next();
    }
}
exports.isTheTaskOwner = isTheTaskOwner;
