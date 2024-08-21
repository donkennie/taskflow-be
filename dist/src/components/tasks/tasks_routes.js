"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const tasks_controller_1 = require("./tasks_controller");
class TaskRoutes {
    baseEndPoint = '/api/tasks';
    constructor(app) {
        const controller = new tasks_controller_1.TaskController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getDetailsHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.TaskRoutes = TaskRoutes;
