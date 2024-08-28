"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const base_service_1 = require("../../utils/base_service");
const db_1 = require("../../utils/db");
const files_entity_1 = require("./files_entity");
class FilesService extends base_service_1.BaseService {
    constructor() {
        let filesRepository = null;
        filesRepository = new db_1.DatabaseUtil().getRepository(files_entity_1.Files);
        super(filesRepository);
    }
}
exports.FilesService = FilesService;
//# sourceMappingURL=files_service.js.map