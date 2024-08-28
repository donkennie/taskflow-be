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
exports.checkValidDate = exports.SERVER_CONST = exports.bcryptCompare = exports.encryptString = exports.Rights = void 0;
const bcrypt = __importStar(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
exports.Rights = {
    ROLES: {
        ADD: 'add_role',
        EDIT: 'edit_role',
        GET_ALL: 'get_all_roles',
        GET_DETAILS: 'get_details_role',
        DELETE: 'delete_role',
        ALL: 'add_role,edit_role,get_all_roles,get_details_role,delete_role'
    },
    USERS: {
        ADD: 'add_user',
        EDIT: 'edit_user',
        GET_ALL: 'get_all_users',
        GET_DETAILS: 'get_details_user',
        DELETE: 'delete_user',
        ALL: 'add_user,edit_user,get_all_users,get_details_user,delete_user'
    },
    PROJECTS: {
        ADD: 'add_project',
        EDIT: 'edit_project',
        GET_ALL: 'get_all_projects',
        GET_DETAILS: 'get_details_project',
        DELETE: 'delete_project',
        ALL: 'add_project,edit_project,get_all_projects,get_details_project,delete_project'
    },
    TASKS: {
        ADD: 'add_task',
        EDIT: 'edit_task',
        GET_ALL: 'get_all_tasks',
        GET_DETAILS: 'get_details_task',
        DELETE: 'delete_task',
        ALL: 'add_task,edit_task,get_all_tasks,get_details_task,delete_task'
    },
    COMMENTS: {
        ADD: 'add_comment',
        EDIT: 'edit_comment',
        GET_ALL: 'get_all_comments',
        GET_DETAILS: 'get_details_comment',
        DELETE: 'delete_comment',
        ALL: 'add_comment,edit_comment,get_all_comments,get_details_comment,delete_comment'
    }
};
const encryptString = async (s) => {
    const encryptedString = await bcrypt.hash(s, 8);
    return encryptedString;
};
exports.encryptString = encryptString;
const bcryptCompare = async (s, hash) => {
    return await bcrypt.compare(s, hash);
};
exports.bcryptCompare = bcryptCompare;
exports.SERVER_CONST = {
    JWTSECRET: 'SecretKeyOfPMS-SECRET',
    ACCESS_TOKEN_EXPIRY_TIME_SECONDS: 1 * 8 * 60 * 60,
    REFRESH_TOKEN_EXPIRY_TIME_SECONDS: 5 * 7 * 24 * 60 * 60,
};
const checkValidDate = function (value) {
    if (!(0, moment_1.default)(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        return false;
    }
    return true;
};
exports.checkValidDate = checkValidDate;
//# sourceMappingURL=common.js.map