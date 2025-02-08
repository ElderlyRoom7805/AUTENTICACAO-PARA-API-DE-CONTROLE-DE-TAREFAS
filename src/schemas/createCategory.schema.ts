import { z } from "zod"

export const createCategorySchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1)
})

export const categoryBodySchema = createCategorySchema.omit({ id: true });