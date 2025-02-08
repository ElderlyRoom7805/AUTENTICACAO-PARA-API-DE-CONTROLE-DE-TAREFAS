import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import {  categoryBodySchema } from "../schemas/createCategory.schema";
import { DoesCategoryExistToDelete } from "../middlewares/doesCategoryExistToDelete.midlewares";
import { verifyToken } from "../middlewares/verifyToken";
import { IsTheCategoryOwner } from "../middlewares/isTheCategoryOwner";

export const categoriesRouter = Router();

const categoriesControllers = new CategoriesControllers();

categoriesRouter.post("/", verifyToken.execute, ValidateBody.execute({body: categoryBodySchema}), categoriesControllers.createCategory);

categoriesRouter.delete("/:id", verifyToken.execute, IsTheCategoryOwner.execute, DoesCategoryExistToDelete.execute, categoriesControllers.deleteCategory)