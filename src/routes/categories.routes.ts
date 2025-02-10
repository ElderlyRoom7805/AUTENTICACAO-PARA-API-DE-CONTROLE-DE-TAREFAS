import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { categoryBodySchema } from "../schemas/createCategory.schema";
import { verifyToken } from "../middlewares/verifyToken";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import { isTheCategoryOwner } from "../middlewares/isTheCategoryOwner";
import { DoesCategoryExist } from "../middlewares/doesCategoryExist.midlewares";

export const categoriesRouter = Router();

const categoriesControllers = new CategoriesControllers();

categoriesRouter.post("/", verifyToken.execute, ValidateBody.execute(categoryBodySchema ), categoriesControllers.createCategory);

categoriesRouter.delete("/:id", verifyToken.execute, DoesCategoryExist.execute, isTheCategoryOwner.execute, categoriesControllers.deleteCategory);