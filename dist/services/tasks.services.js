"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksServices = void 0;
const prisma_1 = require("../database/prisma");
const return_schema_1 = require("../schemas/return.schema");
const tsyringe_1 = require("tsyringe");
let TasksServices = class TasksServices {
    async createTask(body, userId) {
        body.userId = userId;
        return await prisma_1.prisma.task.create({ data: body });
    }
    async getTasks(userId, Name) {
        if (Name) {
            const find = await prisma_1.prisma.task.findMany({
                where: {
                    category: { name: Name },
                    AND: { userId: userId }
                },
                include: {
                    category: true
                }
            });
            return return_schema_1.taskReturnSchema.array().parse(find);
        }
        ;
        const all = await prisma_1.prisma.task.findMany({
            where: {
                userId: userId
            },
            include: {
                category: true
            }
        });
        return return_schema_1.taskReturnSchema.array().parse(all);
    }
    async getOneTask(Id, userId) {
        const data = await prisma_1.prisma.task.findFirst({
            where: { id: Id, AND: { userId: userId } },
            include: { category: true }
        });
        return return_schema_1.taskReturnSchema.parse(data);
    }
    async editTask(body, taskId, userId) {
        return await prisma_1.prisma.task.update({
            where: {
                id: Number(taskId),
                AND: { userId: userId }
            },
            data: body,
        });
    }
    async deleteTask(taskId, userId) {
        if (await prisma_1.prisma.task.findFirst({
            where: {
                id: Number(taskId),
                AND: { userId: userId }
            }
        })) {
            return await prisma_1.prisma.task.delete({ where: { id: Number(taskId) } });
        }
    }
};
exports.TasksServices = TasksServices;
exports.TasksServices = TasksServices = __decorate([
    (0, tsyringe_1.injectable)()
], TasksServices);
