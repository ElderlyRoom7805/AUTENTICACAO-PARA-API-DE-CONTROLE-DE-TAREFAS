"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryBodySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    id: zod_1.z.number().min(1),
    name: zod_1.z.string().min(1)
});
exports.categoryBodySchema = exports.createCategorySchema.omit({ id: true });
