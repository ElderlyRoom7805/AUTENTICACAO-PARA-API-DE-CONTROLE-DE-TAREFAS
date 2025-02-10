import { Router } from "express";
import { TasksControllers } from "../controllers/tasks.controllers";
import { createTaskSchema } from "../schemas/createTask.schema";
import { editTaskSchema } from "../schemas/editTask.schema";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import { verifyToken } from "../middlewares/verifyToken";
import { isTheTaskOwner } from "../middlewares/isTheTaskOwner";
import { DoesBodyCategoryExist } from "../middlewares/doesBodyCategoryExist.midlewares";
import { DoesTaskExist } from "../middlewares/doesTaskExist.middlewares";

export const tasksRouter = Router();

const tasksController = new TasksControllers();

tasksRouter.post("/", verifyToken.execute, ValidateBody.execute(createTaskSchema), DoesBodyCategoryExist.execute, tasksController.createTask);

tasksRouter.get("/", verifyToken.execute, tasksController.getTask);

tasksRouter.get("/:id", verifyToken.execute, DoesTaskExist.execute, isTheTaskOwner.execute, tasksController.getOneTask);

tasksRouter.patch("/:id", verifyToken.execute, DoesTaskExist.execute, isTheTaskOwner.execute, ValidateBody.execute(editTaskSchema), tasksController.editTask);

tasksRouter.delete("/:id", verifyToken.execute, DoesTaskExist.execute, isTheTaskOwner.execute, tasksController.deleteTask);