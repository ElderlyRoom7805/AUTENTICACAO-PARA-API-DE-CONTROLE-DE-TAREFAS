import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import { tasksRouter } from "./routes/tasks.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { userRouter } from "./routes/user.routes";
import { handleError } from "./middlewares/handleErrors.midlewares";



export const app = express();

app.use(json());

app.use("/tasks", tasksRouter);

app.use("/categories", categoriesRouter);

app.use("/users", userRouter);

app.use(helmet());

app.use(cors());

app.use(handleError.execute);
