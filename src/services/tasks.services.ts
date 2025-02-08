import { prisma } from "../database/prisma";
import { taskReturnSchema } from "../schemas/return.schema";
import { createTaskBodyInterfaces, updateTaskBodyInterface } from "../interfaces/tasks.interfaces";
import { injectable } from "tsyringe";

@injectable()
export class TasksServices{
    async createTask(body: createTaskBodyInterfaces, userId: number){
        body.userId = userId;
        return await prisma.task.create({ data: body })
    }

    async getTasks(userId: number, Name?: string){
        if(Name){
            const find = await prisma.task.findMany({
                where: {
                    category: { name: Name },
                    AND: {userId: userId}
                },
                include: {
                    category: true
                }
    
            });
            return taskReturnSchema.array().parse(find);
        }
        const all = await prisma.task.findMany({
            where: {
                userId: userId
            },
            include: {
                category: true
            }
        })
        return taskReturnSchema.array().parse(all)
    }

    async getOneTask(Id: number, userId: number) {
        const data = await prisma.task.findFirst({ 
            where: { id: Id, AND: {userId: userId} },
            include: { category: true }
        });
        return taskReturnSchema.parse(data);
    }

    async editTask(body: updateTaskBodyInterface, taskId: string, userId: number){
        return await prisma.task.update({
            where: {
              id: Number(taskId),
              AND: {userId: userId}
            },
            data: body,
          })
    }

    async deleteTask(taskId: string, userId: number){
        if(await prisma.task.findFirst({
            where: {
                id: Number(taskId),
                AND: {userId: userId}
            }
        })){
            return await prisma.task.delete({where: {id: Number(taskId)}})
        }
    }
}