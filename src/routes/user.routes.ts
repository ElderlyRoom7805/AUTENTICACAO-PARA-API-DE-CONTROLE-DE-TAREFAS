import { Router } from "express";
import { UsersControllers } from "../controllers/users.controllers";
import { registerUserSchema } from "../schemas/user.schema";
import { ValidateBody } from "../middlewares/validateBody.midlewares";
import { DoesEmailExist } from "../middlewares/doesEmailExist";
import { loginUserSchema } from "../schemas/user.schema";
import { verifyToken } from "../middlewares/verifyToken";
import { ValidateLogin } from "../middlewares/validateLogin.middleware";

export const userRouter = Router()
const usersControllers = new UsersControllers()

userRouter.post("/login", ValidateBody.execute({body: loginUserSchema}), ValidateLogin.execute, (req, res) => usersControllers.login (req, res))
userRouter.post("/", ValidateBody.execute({body: registerUserSchema}), DoesEmailExist.execute, (req, res) => usersControllers.register (req, res))
userRouter.get("/profile", verifyToken.execute, (req, res) => usersControllers.profile(req, res))