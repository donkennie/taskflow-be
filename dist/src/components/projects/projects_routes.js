"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const projects_controller_1 = require("./projects_controller");
class ProjectRoutes {
    baseEndPoint = '/api/projects';
    constructor(app) {
        const controller = new projects_controller_1.ProjectController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getDetailsHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.ProjectRoutes = ProjectRoutes;
//# sourceMappingURL=projects_routes.js.map