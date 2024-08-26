"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const comments_controller_1 = require("./comments_controller");
class CommentRoutes {
    baseEndPoint = '/api/comments';
    constructor(app) {
        const controller = new comments_controller_1.CommentController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post(controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getDetailsHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.CommentRoutes = CommentRoutes;
//# sourceMappingURL=comments_routes.js.map