"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesControllers = void 0;
const categories_services_1 = require("../services/categories.services");
const tsyringe_1 = require("tsyringe");
class CategoriesControllers {
    async createCategory(req, res) {
        const { id } = res.locals.decode;
        const categoriesServices = tsyringe_1.container.resolve(categories_services_1.CategoriesServices);
        const response = await categoriesServices.createCategory(req.body, id);
        return res.status(201).json(response);
    }
    async deleteCategory(req, res) {
        const { id } = res.locals.decode;
        const categoriesServices = tsyringe_1.container.resolve(categories_services_1.CategoriesServices);
        const response = await categoriesServices.deleteCategory(Number(req.params.id));
        return res.status(204).json(response);
    }
}
exports.CategoriesControllers = CategoriesControllers;
