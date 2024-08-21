"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = exports.Priority = exports.Status = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users_entity");
const projects_entity_1 = require("../projects/projects_entity");
var Status;
(function (Status) {
    Status["NotStarted"] = "Not-Started";
    Status["InProgress"] = "In-Progress";
    Status["Completed"] = "Completed";
})(Status || (exports.Status = Status = {}));
var Priority;
(function (Priority) {
    Priority["Low"] = "Low";
    Priority["Medium"] = "Medium";
    Priority["High"] = "High";
})(Priority || (exports.Priority = Priority = {}));
let Tasks = class Tasks {
    task_id;
    name;
    description;
    project_id;
    user_id;
    estimated_start_time;
    estimated_end_time;
    actual_start_time;
    actual_end_time;
    priority;
    status;
    supported_files;
    created_at;
    updated_at;
};
exports.Tasks = Tasks;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tasks.prototype, "task_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: true }),
    __metadata("design:type", String)
], Tasks.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Tasks.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.Projects, (projectData) => projectData.project_id),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", String)
], Tasks.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (userData) => userData.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], Tasks.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tasks.prototype, "estimated_start_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tasks.prototype, "estimated_end_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tasks.prototype, "actual_start_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tasks.prototype, "actual_end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Priority,
        default: Priority.Low,
    }),
    __metadata("design:type", String)
], Tasks.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Status,
        default: Status.NotStarted,
    }),
    __metadata("design:type", String)
], Tasks.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Tasks.prototype, "supported_files", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tasks.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tasks.prototype, "updated_at", void 0);
exports.Tasks = Tasks = __decorate([
    (0, typeorm_1.Entity)()
], Tasks);
