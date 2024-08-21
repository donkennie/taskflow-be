"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_controller_1 = require("./users_controller");
class UserRoutes {
    baseEndPoint = '/api/users';
    constructor(app) {
        const controller = new users_controller_1.UserController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getDetailsHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.UserRoutes = UserRoutes;
