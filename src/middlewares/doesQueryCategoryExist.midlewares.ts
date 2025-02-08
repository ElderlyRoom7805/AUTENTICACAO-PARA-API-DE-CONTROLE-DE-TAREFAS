import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class DoesQueryCategoryExist{
    static async execute(req: Request, res: Response, next: NextFunction){
        if(req.query.category){
            const category = await prisma.category.findFirst({
                where: { 
                    name: {
                        contains: req.query.category.toString(), mode: "default"
                    },
                }
            })
            if(!category){
                return res.status(404).json({message: "Category not found"});
            }
        }
        next();
    }
}