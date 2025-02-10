import { Router } from "express";
import { UsersControllers } from "../controllers/users.controllers";
import { registerUserSchema } from "../schemas/user.schema";
import { loginUserSchema } from "../schemas/user.schema";
import { ValidateLogin } from "../middlewares/validateLogin.middleware";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import { verifyToken } from "../middlewares/verifyToken";
import { DoesEmailExist } from "../middlewares/doesEmailExist";

export const userRouter = Router();

const usersControllers = new UsersControllers();

userRouter.post("/login",  ValidateBody.execute( loginUserSchema), ValidateLogin.execute, usersControllers.login);

userRouter.post("/", ValidateBody.execute( registerUserSchema), DoesEmailExist.execute, usersControllers.register);

userRouter.get("/profile", verifyToken.execute, usersControllers.profile);
