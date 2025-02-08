import { Request, Response } from "express";
import { TasksServices } from "../services/tasks.services";
import { container } from "tsyringe";

export class TasksControllers{
    async createTask(req: Request, res: Response): Promise<Response>{
        const tasksServices = container.resolve(TasksServices);

        const response = await tasksServices.createTask(req.body);

        return res.status(201).json(response);
    }

    async getTask(req: Request, res: Response){
        const tasksServices = container.resolve(TasksServices);
        const response = await tasksServices.getTasks(req.query.category as string);
        res.status(200).json(response)
    }

    async getOneTask(req: Request, res: Response){
        const tasksServices = container.resolve(TasksServices);

        const response = await tasksServices.getOneTask(Number(req.params.id));

        return res.status(200).json(response);
    }

    async editTask(req: Request, res: Response){

        const tasksServices = container.resolve(TasksServices);

        const response = await tasksServices.editTask(req.body, req.params.id);

        return res.status(200).json(response);
    }

    async deleteTask(req: Request, res: Response){
        const tasksServices = container.resolve(TasksServices);

        const response = await tasksServices.deleteTask(req.params.id);

        return res.status(204).json(response);
    }
}