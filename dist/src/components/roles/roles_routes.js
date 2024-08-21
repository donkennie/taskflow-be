"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const roles_controller_1 = require("./roles_controller");
const validator_1 = require("../../utils/validator");
const express_validator_1 = require("express-validator");
const validRoleInput = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('It should be required'),
    (0, express_validator_1.body)('description').isLength({ max: 200 }).withMessage('It has maximum limit of 200 characters'),
    (0, express_validator_1.body)('rights').custom((value) => {
        const accessRights = value?.split(',');
        if (accessRights?.length > 0) {
            const validRights = roles_controller_1.RolesUtil.getAllPermissionsFromRights();
            const areAllRightsValid = accessRights.every(right => validRights.includes(right));
            if (!areAllRightsValid) {
                throw new Error('Invalid permission');
            }
        }
        return true;
    })
];
class RoleRoutes {
    baseEndPoint = '/api/roles';
    constructor(app) {
        const controller = new roles_controller_1.RoleController();
        app.route(this.baseEndPoint)
            .post((0, validator_1.validate)(validRoleInput), controller.addHandler)
            .get(controller.getAllHandler);
        app.route(this.baseEndPoint + '/:id')
            .get(controller.getOneHandler)
            .put((0, validator_1.validate)(validRoleInput), controller.updateHandler)
            .delete(controller.deleteHandler);
    }
}
exports.RoleRoutes = RoleRoutes;
