import { Request, Response } from "express";
import { AppError } from "../errors/appError";


export class handleErrors{
    static execute(err: Error, req: Request, res: Response){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({message: err.message});
        } else {
            console.log(err);
            return res.status(500).json({message: "Internal server error"});
        }   
    }
}