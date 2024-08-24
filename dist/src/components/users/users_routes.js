"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const users_controller_1 = require("./users_controller");
const express_validator_1 = require("express-validator");
const validator_1 = require("../../utils/validator");
const validUserInput = [
    (0, express_validator_1.body)('username').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('It should be valid emailId'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6, max: 12 }).withMessage('It must be between 6 and 12 characters in length')
        .isStrongPassword({ minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
        .withMessage('It should include at least one uppercase letter, one lowercase letter, one special symbol, and one numerical digit.'),
    (0, express_validator_1.body)('role_id').isUUID().withMessage('It must be uuid of role')
];
class UserRoutes {
    baseEndPoint = '/api/users';
    constructor(app) {
        const controller = new users_controller_1.UserController();
        app.route(this.baseEndPoint)
            .get(controller.getAllHandler)
            .post((0, validator_1.validate)(validUserInput), controller.addHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getAllHandler)
            .put(controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.UserRoutes = UserRoutes;
