import { prisma } from "../database/prisma";
import { taskReturnSchema } from "../schemas/return.schema";
import { createTaskBodyInterfaces, updateTaskBodyInterface } from "../interfaces/tasks.interfaces";
import { injectable } from "tsyringe";

@injectable()
export class TasksServices{
    async createTask(body: createTaskBodyInterfaces){
        return await prisma.task.create({ data: body })
    }

    async getTasks(Name?: string){
        if(Name){
            const find = await prisma.task.findMany({
                where: {
                    category: { name: Name },
                },
                include: {
                    category: true
                }
    
            });
            return taskReturnSchema.array().parse(find);
        }
        const all = await prisma.task.findMany({
            include: {
                category: true
            }
        })
        return taskReturnSchema.array().parse(all)
    }

    async getOneTask(Id: number) {
        const data = await prisma.task.findFirst({ 
            where: { id: Id },
            include: { category: true }
        });
        return taskReturnSchema.parse(data);
    }

    async editTask(body: updateTaskBodyInterface, taskId: string){
        return await prisma.task.update({
            where: {
              id: Number(taskId),
            },
            data: body,
          })
    }

    async deleteTask(taskId: string){
        if(await prisma.task.findFirst({
            where: {
                id: Number(taskId),
            }
        })){
            return await prisma.task.delete({where: {id: Number(taskId)}})
        }
    }
}