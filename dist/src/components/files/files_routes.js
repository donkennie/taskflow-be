"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRoutes = void 0;
const files_controller_1 = require("./files_controller");
const multer_1 = require("../../utils/multer");
const auth_util_1 = require("../../utils/auth_util");
class FileRoutes {
    baseEndPoint = '/api/files';
    constructor(app) {
        const controller = new files_controller_1.FileController();
        app.route(this.baseEndPoint)
            .all(auth_util_1.authorize)
            .post(multer_1.fileUploadMiddleware, controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .all(auth_util_1.authorize)
            .get(controller.getOneHandler);
    }
}
exports.FileRoutes = FileRoutes;
//# sourceMappingURL=files_routes.js.map