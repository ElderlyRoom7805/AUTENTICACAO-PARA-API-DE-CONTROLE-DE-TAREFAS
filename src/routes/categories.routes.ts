import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";
import {  categoryBodySchema } from "../schemas/createCategory.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { isTheCategoryOwner } from "../middlewares/isTheCategoryOwner.middleware";
import { DoesQueryCategoryExist } from "../middlewares/DoesQueryCategoryExist.middleware";

export const categoriesRouter = Router();

const categoriesControllers = new CategoriesControllers();

categoriesRouter.post("/", verifyToken.execute, ValidateBody.execute( categoryBodySchema ), categoriesControllers.createCategory);

categoriesRouter.delete("/:id", verifyToken.execute, DoesQueryCategoryExist.execute, isTheCategoryOwner.execute, categoriesControllers.deleteCategory)