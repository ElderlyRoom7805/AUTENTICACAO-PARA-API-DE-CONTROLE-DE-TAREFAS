"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksControllers = void 0;
const tasks_services_1 = require("../services/tasks.services");
const tsyringe_1 = require("tsyringe");
class TasksControllers {
    async createTask(req, res) {
        const { id } = res.locals.decode;
        const tasksServices = tsyringe_1.container.resolve(tasks_services_1.TasksServices);
        const response = await tasksServices.createTask(req.body, id);
        return res.status(201).json(response);
    }
    async getTask(req, res) {
        const { id } = res.locals.decode;
        const tasksServices = tsyringe_1.container.resolve(tasks_services_1.TasksServices);
        const response = await tasksServices.getTasks(id, req.query.category);
        res.status(200).json(response);
    }
    async getOneTask(req, res) {
        const { id } = res.locals.decode;
        const tasksServices = tsyringe_1.container.resolve(tasks_services_1.TasksServices);
        const response = await tasksServices.getOneTask(Number(req.params.id), id);
        return res.status(200).json(response);
    }
    async editTask(req, res) {
        const { id } = res.locals.decode;
        const tasksServices = tsyringe_1.container.resolve(tasks_services_1.TasksServices);
        const response = await tasksServices.editTask(req.body, req.params.id, id);
        return res.status(200).json(response);
    }
    async deleteTask(req, res) {
        const { id } = res.locals.decode;
        const tasksServices = tsyringe_1.container.resolve(tasks_services_1.TasksServices);
        const response = await tasksServices.deleteTask(req.params.id, id);
        return res.status(204).json(response);
    }
}
exports.TasksControllers = TasksControllers;
