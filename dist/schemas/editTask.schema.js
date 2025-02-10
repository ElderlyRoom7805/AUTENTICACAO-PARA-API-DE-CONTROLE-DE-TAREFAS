"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTaskSchema = void 0;
const zod_1 = require("zod");
exports.editTaskSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    finished: zod_1.z.boolean().optional(),
    categoryId: zod_1.z.number().optional()
});
