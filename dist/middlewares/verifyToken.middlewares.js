"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class verifyToken {
    static execute(req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization?.replace("Bearer ", "");
        if (!token) {
            throw new appError_1.AppError(401, "Token is required");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.decode = jsonwebtoken_1.default.decode(token);
        next();
    }
}
exports.verifyToken = verifyToken;
