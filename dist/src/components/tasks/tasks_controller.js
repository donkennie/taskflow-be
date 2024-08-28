"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUtil = exports.TaskController = void 0;
const auth_util_1 = require("../../utils/auth_util");
const base_controller_1 = require("../../utils/base_controller");
const tasks_service_1 = require("./tasks_service");
const users_controller_1 = require("../users/users_controller");
const projects_controller_1 = require("../projects/projects_controller");
const notification_util_1 = require("../../utils/notification_util");
class TaskController extends base_controller_1.BaseController {
    async addHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'add_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        try {
            const service = new tasks_service_1.TasksService();
            const task = req.body;
            const project = await projects_controller_1.ProjectsUtil.getProjectByProjectId(task.project_id);
            const isValidProject = project ? true : false;
            if (!isValidProject) {
                res.status(400).json({ statusCode: 400, status: 'error', message: 'Invalid project_id' });
                return;
            }
            const isValidUser = await users_controller_1.UsersUtil.checkValidUserIds([task.user_id]);
            if (!isValidUser) {
                res.status(400).json({ statusCode: 400, status: 'error', message: 'Invalid user_id' });
                return;
            }
            const createdTask = await service.create(task);
            res.status(201).json(createdTask);
            await TaskUtil.notifyUsers(project, task, 'add');
        }
        catch (error) {
            console.error(`Error while addUser => ${error.message}`);
            res.status(500).json({ statusCode: 500, status: 'error', message: 'Internal server error' });
        }
    }
    async getAllHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'get_all_tasks')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        const service = new tasks_service_1.TasksService();
        const result = await service.findAll(req.query);
        const tasks = result.data;
        res.status(result.statusCode).json(result);
    }
    async getOneHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'get_details_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
        }
        const service = new tasks_service_1.TasksService();
        const result = await service.findOne(req.params.id);
        res.status(result.statusCode).json(result);
    }
    async updateHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'edit_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        const task = req.body;
        const service = new tasks_service_1.TasksService();
        const result = await service.update(req.params.id, task);
        res.status(result.statusCode).json(result);
    }
    async deleteHandler(req, res) {
        if (!(0, auth_util_1.hasPermission)(req.user.rights, 'delete_task')) {
            res.status(403).json({ statusCode: 403, status: 'error', message: 'Unauthorised' });
            return;
        }
        const service = new tasks_service_1.TasksService();
        const result = await service.delete(req.params.id);
        res.status(result.statusCode).json(result);
    }
}
exports.TaskController = TaskController;
class TaskUtil {
    static async notifyUsers(project, task, action) {
        if (project) {
            const userIds = project.user_ids;
            let subject = '';
            let body = '';
            if (action === 'add') {
                subject = 'New Task Created';
                body = `A new task has been created with the title ${task.title} and description ${task.description}`;
            }
            else if (action === 'update') {
                subject = 'Task Updated';
                body = `A task has been updated with the title ${task.title} and description ${task.description}`;
            }
            else if (action === 'delete') {
                subject = 'Task Deleted';
                body = `A task has been deleted with the title ${task.title} and description ${task.description}`;
            }
            for (const userId of userIds) {
                const user = await users_controller_1.UsersUtil.getUserById(userId);
                if (user) {
                    await notification_util_1.NotificationUtil.enqueueEmail(user.email, subject, body);
                }
            }
        }
    }
    static async notifyUsers_(project, task, newTask = true) {
        if (project) {
            const userIds = project.user_ids;
            for (const userId of userIds) {
                const user = await users_controller_1.UsersUtil.getUserById(userId);
                if (user) {
                    await notification_util_1.NotificationUtil.enqueueEmail(user.email, newTask ? 'New Task Created' : 'Task Updated', newTask ? `A new task has been created with the title ${task.title} and description ${task.description}` : `A task has been updated with the title ${task.title} and description ${task.description}`);
                }
            }
        }
    }
}
exports.TaskUtil = TaskUtil;
//# sourceMappingURL=tasks_controller.js.map