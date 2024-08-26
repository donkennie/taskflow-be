"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
const roles_entity_1 = require("./roles_entity");
class RolesService extends base_service_1.BaseService {
    constructor() {
        const databaseUtil = new db_1.DatabaseUtil();
        const roleRepository = databaseUtil.getRepository(roles_entity_1.Roles);
        super(roleRepository);
    }
}
exports.RolesService = RolesService;
//# sourceMappingURL=roles_service.js.map