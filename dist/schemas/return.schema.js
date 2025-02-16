"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskReturnSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const createCategory_schema_1 = require("./createCategory.schema");
exports.taskSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    finished: zod_1.z.boolean().default(false),
});
exports.taskReturnSchema = exports.taskSchema.extend({ category: createCategory_schema_1.createCategorySchema.nullable(), });
