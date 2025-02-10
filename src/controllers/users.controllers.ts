import { Request, Response } from "express";
import { UserServices } from "../services/users.services";
import { container } from "tsyringe";

export class UsersControllers{
    async login(req: Request, res: Response){
        const userServices = container.resolve(UserServices);

        const response = await userServices.login(res.locals.user);

        return res.status(200).json(response);
    }

    async register(req: Request, res: Response){
        const userServices = container.resolve(UserServices);

        const response = await userServices.register(req.body);

        return res.status(201).json(response);
    }

    async profile(req: Request, res: Response){
        const { id } = res.locals.decode;

        const userServices = container.resolve(UserServices);

        const response = await userServices.getUser(id);

        return res.status(200).json(response);
    }
}