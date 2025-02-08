import { AnyZodObject, ZodError } from "zod";
import { NextFunction, Request, Response } from "express";

interface requestSchemaInterface{
    params?: AnyZodObject;
    body?: AnyZodObject;
    query?: AnyZodObject;
}

export class ValidateBody{
   static execute(schema: requestSchemaInterface){
       return async (req: Request, res: Response, next: NextFunction) => {
           try {
                if(schema.body){
                    req.body = await schema.body.parseAsync(req.body);
                } else if(schema.params){
                    req.params = await schema.params.parseAsync(req.params);
                } else if(schema.query){
                    req.query = await schema.query.parseAsync(req.query);
                }         
   
               next();
           } catch (error) {
               if(error instanceof ZodError){
                    const data = { errors: error.issues };
                    return res.status(400).json(data); 
               }                
           }  
       }            
   }
}