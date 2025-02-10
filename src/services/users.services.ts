import jwt from "jsonwebtoken"
import { prisma } from "../database/prisma"
import bcrypt from "bcrypt";
import { userReturn, tUser, tUserRegister } from "../schemas/user.schema";
import { injectable } from "tsyringe";

@injectable()
export class UserServices{
    async login(user: tUser){
        const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string);
    
        return {
          accessToken: token,
          user: userReturn.parse(user),
        };
      }
    

    async register(body: tUserRegister){
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        }

        const data = await prisma.user.create({data: newUser})
        return userReturn.parse(data)
    }

    async getUser(id: number) {
        const user = await prisma.user.findFirst({
          where: { id },
        });
    
        return userReturn.parse(user);
      }
}