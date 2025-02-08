import { z } from "zod";
import { createCategorySchema } from "./createCategory.schema";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
});

export const taskReturnSchema = taskSchema.extend({ category: createCategorySchema.nullable(), });

export type taskReturn = z.infer<typeof taskReturnSchema>;