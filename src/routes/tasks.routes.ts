import { Router } from "express";
import { TasksControllers } from "../controllers/tasks.controllers";
import { createTaskSchema } from "../schemas/createTask.schema";
import { editTaskSchema } from "../schemas/editTask.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { isTheTaskOwner } from "../middlewares/isTheTaskOwnermiddleware";
import { isTheCategoryOwner } from "../middlewares/isTheCategoryOwner.middleware";
import { DoesQueryCategoryExist } from "../middlewares/DoesQueryCategoryExist.middleware";



export const tasksRouter = Router();

const tasksController = new TasksControllers();

tasksRouter.post("/", verifyToken.execute, ValidateBody.execute(createTaskSchema), DoesQueryCategoryExist.execute, tasksController.createTask);

tasksRouter.get("/", verifyToken.execute, tasksController.getTask);

tasksRouter.get("/:id", verifyToken.execute, isTheTaskOwner.execute, isTheCategoryOwner.execute, tasksController.getOneTask);

tasksRouter.patch("/:id", verifyToken.execute, isTheTaskOwner.execute, isTheCategoryOwner.execute, ValidateBody.execute(editTaskSchema), tasksController.editTask);

tasksRouter.delete("/:id", verifyToken.execute, isTheTaskOwner.execute, isTheCategoryOwner.execute, tasksController.deleteTask);