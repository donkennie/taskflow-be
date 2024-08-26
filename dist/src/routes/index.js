"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const roles_routes_1 = require("../components/roles/roles_routes");
const users_routes_1 = require("../components/users/users_routes");
const projects_routes_1 = require("../components/projects/projects_routes");
const tasks_routes_1 = require("../components/tasks/tasks_routes");
const comments_routes_1 = require("../components/comments/comments_routes");
class Routes {
    router;
    constructor(app) {
        const routeClasses = [
            roles_routes_1.RoleRoutes,
            users_routes_1.UserRoutes,
            projects_routes_1.ProjectRoutes,
            tasks_routes_1.TaskRoutes,
            comments_routes_1.CommentRoutes
        ];
        for (const routeClass of routeClasses) {
            try {
                new routeClass(app);
                console.log(`Router : ${routeClass.name} - Connected`);
            }
            catch (error) {
                console.log(`Router : ${routeClass.name} - Failed`);
            }
        }
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map