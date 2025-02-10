import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";
import { container } from "tsyringe";

export class CategoriesControllers{
    async createCategory(req: Request, res: Response){
        const { id } = res.locals.decode;

        const categoriesServices = container.resolve(CategoriesServices);

        const response = await categoriesServices.createCategory(req.body, id);

        return res.status(201).json(response);
    }

    async deleteCategory(req: Request, res: Response){
        const { id } = res.locals.decode;

        const categoriesServices = container.resolve(CategoriesServices);

        const response = await categoriesServices.deleteCategory(Number(req.params.id));

        return res.status(204).json(response);
    }
}