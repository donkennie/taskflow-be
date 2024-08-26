"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
const users_entity_1 = require("./users_entity");
class UsersService extends base_service_1.BaseService {
    constructor() {
        let userRepository = null;
        userRepository = new db_1.DatabaseUtil().getRepository(users_entity_1.Users);
        super(userRepository);
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users_service.js.map