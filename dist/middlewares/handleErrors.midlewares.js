"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const appError_1 = require("../errors/appError");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
class handleError {
    static execute(error, req, res, next) {
        if (error instanceof appError_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        else if (error instanceof zod_1.ZodError) {
            const data = { errors: error.issues };
            return res.status(400).json(data);
        }
        else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({ message: error.message });
        }
        else {
            console.log(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}
exports.handleError = handleError;
