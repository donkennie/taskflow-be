"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const tasks_controller_1 = require("./tasks_controller");
const express_validator_1 = require("express-validator");
const common_1 = require("../../utils/common");
const validator_1 = require("../../utils/validator");
const auth_util_1 = require("../../utils/auth_util");
const validTaskInput = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('project_id').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('user_id').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('estimated_start_time').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('estimated_end_time').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('estimated_start_time').custom((value) => {
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
    (0, express_validator_1.body)('estimated_end_time').custom((value, { req }) => {
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
const updateTaskInput = [
    (0, express_validator_1.body)('estimated_start_time').custom((value) => {
        if (value && !(0, common_1.checkValidDate)(value)) {
            throw new Error('Invalid date format YYYY-MM-DD HH:mm:ss');
        }
        const startTime = new Date(value);
        const currentTime = new Date();
        if (startTime <= currentTime) {
            throw new Error('Start time must be greater than the current time');
        }
        return true;
    }),
    (0, express_validator_1.body)('estimated_end_time').custom((value, { req }) => {
        if (value && !(0, common_1.checkValidDate)(value)) {
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
class TaskRoutes {
    baseEndPoint = '/api/tasks';
    constructor(app) {
        const controller = new tasks_controller_1.TaskController();
        app.route(this.baseEndPoint)
            .all(auth_util_1.authorize)
            .get(controller.getAllHandler)
            .post((0, validator_1.validate)(validTaskInput), controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .all(auth_util_1.authorize)
            .get(controller.getOneHandler)
            .put((0, validator_1.validate)(updateTaskInput), controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.TaskRoutes = TaskRoutes;
//# sourceMappingURL=tasks_routes.js.map