"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturn = exports.loginUserSchema = exports.registerUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1).email(),
    password: zod_1.z.string().min(1)
});
exports.registerUserSchema = exports.userSchema.omit({ id: true });
exports.loginUserSchema = exports.userSchema.omit({ id: true, name: true });
exports.userReturn = exports.userSchema.omit({ password: true });
