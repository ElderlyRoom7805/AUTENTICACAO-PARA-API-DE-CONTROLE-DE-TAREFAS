"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../schemas/user.schema");
const tsyringe_1 = require("tsyringe");
let UserServices = class UserServices {
    async login(user) {
        const token = jsonwebtoken_1.default.sign({ id: user?.id }, process.env.JWT_SECRET);
        return {
            accessToken: token,
            user: user_schema_1.userReturn.parse(user),
        };
    }
    async register(body) {
        const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
        const newUser = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        };
        const data = await prisma_1.prisma.user.create({ data: newUser });
        return user_schema_1.userReturn.parse(data);
    }
    async getUser(id) {
        const user = await prisma_1.prisma.user.findFirst({
            where: { id },
        });
        return user_schema_1.userReturn.parse(user);
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, tsyringe_1.injectable)()
], UserServices);
