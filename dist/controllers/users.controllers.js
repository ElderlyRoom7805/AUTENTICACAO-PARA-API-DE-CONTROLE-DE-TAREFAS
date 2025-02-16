"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersControllers = void 0;
const users_services_1 = require("../services/users.services");
const tsyringe_1 = require("tsyringe");
class UsersControllers {
    async login(req, res) {
        const userServices = tsyringe_1.container.resolve(users_services_1.UserServices);
        const response = await userServices.login(res.locals.user);
        return res.status(200).json(response);
    }
    async register(req, res) {
        const userServices = tsyringe_1.container.resolve(users_services_1.UserServices);
        const response = await userServices.register(req.body);
        return res.status(201).json(response);
    }
    async profile(req, res) {
        const { id } = res.locals.decode;
        const userServices = tsyringe_1.container.resolve(users_services_1.UserServices);
        const response = await userServices.getUser(id);
        return res.status(200).json(response);
    }
}
exports.UsersControllers = UsersControllers;
