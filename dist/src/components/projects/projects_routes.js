"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const projects_controller_1 = require("./projects_controller");
const express_validator_1 = require("express-validator");
const validator_1 = require("../../utils/validator");
const auth_util_1 = require("../../utils/auth_util");
const common_1 = require("../../utils/common");
const validProjectInput = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('user_ids').isArray().withMessage('It should be ids of users array'),
    (0, express_validator_1.body)('start_time').custom((value) => {
        if (!(0, common_1.checkValidDate)(value)) {
            throw new Error('Invalid date format YYYY-MM-DD HH:mm:ss');
        }
        const startTime = new Date(value);
        const currentTime = new Date();
        if (startTime <= currentTime) {
            throw new Error('Start time must be greater than the current time');
        }
        return true;
    }),
    (0, express_validator_1.body)('end_time').custom((value, { req }) => {
        if (!(0, common_1.checkValidDate)(value)) {
            throw new Error('Invalid date format YYYY-MM-DD HH:mm:ss');
        }
        const startTime = new Date(req.body.start_time);
        const endTime = new Date(value);
        if (endTime <= startTime) {
            throw new Error('End time must be greater than the start time');
        }
        return true;
    })
];
class ProjectRoutes {
    baseEndPoint = '/api/projects';
    constructor(app) {
        const controller = new projects_controller_1.ProjectController();
        app.route(this.baseEndPoint)
            .all(auth_util_1.authorize)
            .get(controller.getAllHandler)
            .post((0, validator_1.validate)(validProjectInput), controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .all(auth_util_1.authorize)
            .get(controller.getOneHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.ProjectRoutes = ProjectRoutes;
//# sourceMappingURL=projects_routes.js.map