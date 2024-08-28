"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const base_controller_1 = require("../../utils/base_controller");
const multer_1 = require("../../utils/multer");
const files_service_1 = require("./files_service");
const files_entity_1 = require("./files_entity");
const config = __importStar(require("../../../server_config.json"));
class FileController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        try {
            const fileDataFromMulter = (0, multer_1.uploadFile)(req);
            const service = new files_service_1.FilesService();
            const fileData = new files_entity_1.Files();
            fileData.file_name = fileDataFromMulter.filename;
            fileData.mime_type = fileDataFromMulter.mimetype;
            fileData.created_by = req?.user?.user_id ? req?.user?.user_id : null;
            fileData.task_id = req.body.task_id;
            const createdFile = await service.create(fileData);
            res.status(200).json({ message: 'File uploaded successfully', createdFile });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAllHandler(req, res) {
    }
    async getOneHandler(req, res) {
        try {
            const service = new files_service_1.FilesService();
            const server_config = config;
            const result = await service.findOne(req.params.id);
            const file_path = `${server_config.attached_files_path}/${result.data.file_name}`;
            res.sendFile(file_path, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).json({ error: err.message });
                }
                else {
                    res.status(200).end();
                }
            });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateHandler(req, res) { }
    async deleteHandler(req, res) { }
}
exports.FileController = FileController;
//# sourceMappingURL=files_controller.js.map