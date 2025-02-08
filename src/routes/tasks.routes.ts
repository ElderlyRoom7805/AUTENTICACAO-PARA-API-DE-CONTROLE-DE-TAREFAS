import { Router } from "express";
import { TasksControllers } from "../controllers/tasks.controllers";
import { DoesCategoryExist } from "../middlewares/doesCategoryExist.midlewares";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import { createTaskSchema } from "../schemas/createTask.schema";
import { DoesTaskExist } from "../middlewares/doesTaskExist.middlewares";
import { editTaskSchema } from "../schemas/editTask.schema";
import { DoesTaskCategoryExist } from "../middlewares/doesTaskCategoryExist.middlewares";
import { DoesQueryCategoryExist } from "../middlewares/doesQueryCategoryExist.midlewares";
import { verifyToken } from "../middlewares/verifyToken";
import { IsTheTaskOwner } from "../middlewares/isTheTaskOwner";


export const tasksRouter = Router();

const tasksController = new TasksControllers();

tasksRouter.post("/", verifyToken.execute, ValidateBody.execute({body: createTaskSchema}), DoesTaskCategoryExist.execute, tasksController.createTask);

tasksRouter.get("/", verifyToken.execute, DoesQueryCategoryExist.execute, tasksController.getTask);

tasksRouter.get("/:id", verifyToken.execute, IsTheTaskOwner.execute, DoesTaskExist.execute, tasksController.getOneTask);

tasksRouter.patch("/:id", verifyToken.execute, IsTheTaskOwner.execute, ValidateBody.execute({body: editTaskSchema}), DoesTaskExist.execute, DoesCategoryExist.execute, tasksController.editTask);

tasksRouter.delete("/:id", verifyToken.execute, IsTheTaskOwner.execute, DoesTaskExist.execute, tasksController.deleteTask);