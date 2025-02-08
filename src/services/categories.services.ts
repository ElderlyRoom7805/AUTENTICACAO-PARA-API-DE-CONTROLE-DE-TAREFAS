import { injectable } from "tsyringe"
import { prisma } from "../database/prisma"
import { createCategoryBodyInterfaces } from "../interfaces/categories.interfaces"

@injectable()
export class CategoriesServices{
    async createCategory(body: createCategoryBodyInterfaces){
        return await prisma.category.create({data: body})
    }

    async deleteCategory(categoryId: string){
            return await prisma.category.delete({where: {id: Number(categoryId)}})
    }
}