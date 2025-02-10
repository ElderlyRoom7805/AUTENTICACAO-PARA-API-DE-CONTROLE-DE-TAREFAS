import jwt from "jsonwebtoken"
import { IUser, TLoginReturn, TUserLoginBody, TUserRegisterBody, TUserReturn } from "../interfaces/user.interfaces"
import { prisma } from "../database/prisma"
import bcrypt from "bcrypt";
import { AppError } from "../errors/appError";
import { userReturn, tUser, tLoginReturn, tUserReturn } from "../schemas/user.schema";

export class UserServices{
    async login(user: tUser): Promise<tLoginReturn> {
        const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string);
    
        return {
          accessToken: token,
          user: userReturn.parse(user),
        };
      }
    

    async register(body: TUserRegisterBody): Promise<TUserReturn>{
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        }

        const data = await prisma.user.create({data: newUser})
        return userReturn.parse(data)
    }

    async getUser(id: number): Promise<tUserReturn> {
        const user = await prisma.user.findFirst({
          where: { id },
        });
    
        return userReturn.parse(user);
      }
}