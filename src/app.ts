import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import "dotenv/config";
import { tasksRouter } from "./routes/tasks.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { handleErrors } from "./middlewares/handleErrors.midlewares";

export const app = express();

app.use(json());

app.use("/tasks", tasksRouter);

app.use("/categories", categoriesRouter);

app.use(helmet());

app.use(handleErrors.execute);
