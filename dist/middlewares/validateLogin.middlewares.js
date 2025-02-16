"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateLogin = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ValidateLogin {
    static async execute(req, res, next) {
        const user = (await prisma_1.prisma.user.findFirst({
            where: { email: req.body.email },
        }));
        if (!user) {
            throw new appError_1.AppError(404, "User does not exist");
        }
        const compare = await bcrypt_1.default.compare(req.body.password, user?.password);
        if (!compare) {
            throw new appError_1.AppError(401, "Email and password do not match");
        }
        res.locals.user = user;
        next();
    }
}
exports.ValidateLogin = ValidateLogin;
