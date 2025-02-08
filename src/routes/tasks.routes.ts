import { Router } from "express";
import { TasksControllers } from "../controllers/tasks.controllers";
import { DoesCategoryExist } from "../middlewares/doesCategoryExist.midlewares";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import { createTaskSchema } from "../schemas/createTask.schema";
import { DoesTaskExist } from "../middlewares/doesTaskExist.middlewares";
import { editTaskSchema } from "../schemas/editTask.schema";
import { DoesTaskCategoryExist } from "../middlewares/doesTaskCategoryExist.middlewares";
import { DoesQueryCategoryExist } from "../middlewares/doesQueryCategoryExist.midlewares";

export const tasksRouter = Router();

const tasksController = new TasksControllers();

tasksRouter.post("/", ValidateBody.execute({body: createTaskSchema}), DoesTaskCategoryExist.execute, tasksController.createTask);

tasksRouter.get("/", DoesQueryCategoryExist.execute, tasksController.getTask);

tasksRouter.get("/:id", DoesTaskExist.execute, tasksController.getOneTask);

tasksRouter.patch("/:id", ValidateBody.execute({body: editTaskSchema}), DoesTaskExist.execute, DoesCategoryExist.execute, tasksController.editTask);

tasksRouter.delete("/:id", DoesTaskExist.execute, tasksController.deleteTask);