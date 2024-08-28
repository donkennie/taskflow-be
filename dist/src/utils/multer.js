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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.fileUploadMiddleware = exports.multerConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const config = __importStar(require("../../server_config.json"));
exports.multerConfig = {
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const server_config = config;
            cb(null, server_config.attached_files_path);
        },
        filename: (req, file, cb) => {
            const uniqueFileName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueFileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'), false);
        }
    }
};
const upload = (0, multer_1.default)(exports.multerConfig);
exports.fileUploadMiddleware = upload.single('file');
const uploadFile = (req) => {
    if (!req.file) {
        throw new Error('No file provided');
    }
    const fileData = req.file;
    return fileData;
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=multer.js.map