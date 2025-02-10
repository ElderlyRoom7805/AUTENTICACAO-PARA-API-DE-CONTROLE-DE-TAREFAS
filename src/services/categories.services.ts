import { injectable } from "tsyringe"
import { prisma } from "../database/prisma"
import { createCategoryBodyInterfaces } from "../interfaces/categories.interfaces"

@injectable()
export class CategoriesServices{
    async createCategory(body: createCategoryBodyInterfaces, userId: number){
        body.userId = userId;

        return await prisma.category.create({data: body});
    }

    async deleteCategory(id: number){
        await prisma.category.delete({ where: { id } });
    }
}