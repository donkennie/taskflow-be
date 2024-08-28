"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsUtil = exports.ProjectController = void 0;
const auth_util_1 = require("../../utils/auth_util");
const projects_service_1 = require("./projects_service");
const users_controller_1 = require("../users/users_controller");
const base_controller_1 = require("../../utils/base_controller");
class ProjectController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'add_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        try {
            const service = new projects_service_1.ProjectsService();
            const project = req.body;
            const isValidUsers = await users_controller_1.UsersUtil.checkValidUserIds(project.user_ids);
            if (!isValidUsers) {
                res.status(400).json({ statusCode: 400, status: 'error', message: 'Invalid user_ids' });
                return;
            }
            const createdProject = await service.create(project);
            res.status(createdProject.statusCode).json(createdProject);
        }
        catch (error) {
            console.error(`Error while addUser => ${error.message}`);
            res.status(500).json({ statusCode: 500, status: 'error', message: 'Internal server error' });
        }
    }
    async getAllHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'get_all_projects')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        const service = new projects_service_1.ProjectsService();
        const result = await service.findAll(req.query);
        for (const project of result.data) {
            project['users'] = await users_controller_1.UsersUtil.getUsernamesById(project.user_ids);
            delete project.user_ids;
        }
        res.status(result.statusCode).json(result);
    }
    async getOneHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'get_details_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
        }
        const service = new projects_service_1.ProjectsService();
        const result = await service.findOne(req.params.id);
        result.data['users'] = await users_controller_1.UsersUtil.getUsernamesById(result.data.user_ids);
        delete result.data.user_ids;
        res.status(result.statusCode).json(result);
    }
    async updateHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'edit_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        const project = req.body;
        const service = new projects_service_1.ProjectsService();
        const result = await service.update(req.params.id, project);
        res.status(result.statusCode).json(result);
    }
    async deleteHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'delete_project')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        const service = new projects_service_1.ProjectsService();
        const result = await service.delete(req.params.id);
        res.status(result.statusCode).json(result);
    }
}
exports.ProjectController = ProjectController;
class ProjectsUtil {
    static async checkValidProjectIds(project_ids) {
        const projectService = new projects_service_1.ProjectsService();
        const projects = await projectService.findByIds(project_ids);
        return projects.data.length === project_ids.length;
    }
    static async getProjectByProjectId(project_id) {
        const projectService = new projects_service_1.ProjectsService();
        const project = await projectService.findOne(project_id);
        return project.data;
    }
}
exports.ProjectsUtil = ProjectsUtil;
//# sourceMappingURL=projects_controller.js.map