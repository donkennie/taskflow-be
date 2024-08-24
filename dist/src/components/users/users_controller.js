"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersUtil = exports.UserController = void 0;
const base_controller_1 = require("../../utils/base_controller");
const common_1 = require("../../utils/common");
const roles_controller_1 = require("../roles/roles_controller");
const users_service_1 = require("./users_service");
class UserController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        try {
            const service = new users_service_1.UsersService();
            const user = req.body;
            const isValidRole = await roles_controller_1.RolesUtil.checkValidRoleIds(user.role_ids);
            if (!isValidRole) {
                res.status(400).json({ statusCode: 400, status: 'error', message: 'Invalid role_ids' });
                return;
            }
            user.email = user.email?.toLowerCase();
            user.username = user.username?.toLowerCase();
            user.password = await (0, common_1.encryptString)(user.password);
            const createdUser = await service.create(user);
            res.status(createdUser.statusCode).json(createdUser);
        }
        catch (error) {
            console.error(`Error while addUser => ${error.message}`);
            res.status(500).json({ statusCode: 500, status: 'error', message: 'Internal server error' });
        }
    }
    getAllHandler(req, res) {
        throw new Error('Method not implemented.');
    }
    getOneHandler(req, res) {
        throw new Error('Method not implemented.');
    }
    updateHandler(req, res) {
        throw new Error('Method not implemented.');
    }
    deleteHandler(req, res) {
        throw new Error('Method not implemented.');
    }
}
exports.UserController = UserController;
class UsersUtil {
    static async getUserFromUsername(username) {
        try {
            if (username) {
                const service = new users_service_1.UsersService();
                const users = await service.customQuery(`username = '${username}'`);
                if (users && users.length > 0) {
                    return users[0];
                }
            }
        }
        catch (error) {
            console.error(`Error while getUserFromToken() => ${error.message}`);
        }
        return null;
    }
    static async getUserByEmail(email) {
        try {
            if (email) {
                const service = new users_service_1.UsersService();
                const users = await service.customQuery(`email = '${email}'`);
                if (users && users.length > 0) {
                    return users[0];
                }
            }
        }
        catch (error) {
            console.error(`Error while getUserFromToken() => ${error.message}`);
        }
        return null;
    }
}
exports.UsersUtil = UsersUtil;
