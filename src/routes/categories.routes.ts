import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import {  categoryBodySchema } from "../schemas/createCategory.schema";
import { DoesCategoryExistToDelete } from "../middlewares/doesCategoryExistToDelete.midlewares";


export const categoriesRouter = Router();

const categoriesControllers = new CategoriesControllers();

categoriesRouter.post("/", ValidateBody.execute({body: categoryBodySchema}), categoriesControllers.createCategory);

categoriesRouter.delete("/:id", DoesCategoryExistToDelete.execute, categoriesControllers.deleteCategory);