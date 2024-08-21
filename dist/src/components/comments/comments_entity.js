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
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users_entity");
const tasks_entity_1 = require("../tasks/tasks_entity");
let Comments = class Comments {
    comment_id;
    comment;
    user_id;
    task_id;
    supported_files;
    created_at;
    updated_at;
};
exports.Comments = Comments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Comments.prototype, "comment_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Comments.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.Users, (userData) => userData.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.Users)
], Comments.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => tasks_entity_1.Tasks, (taskData) => taskData.task_id),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", tasks_entity_1.Tasks)
], Comments.prototype, "task_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Comments.prototype, "supported_files", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comments.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Comments.prototype, "updated_at", void 0);
exports.Comments = Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
