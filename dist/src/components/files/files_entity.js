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
exports.Files = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users_entity");
const tasks_entity_1 = require("../tasks/tasks_entity");
let Files = class Files {
    file_id;
    file_name;
    mime_type;
    created_by;
    task_id;
    created_at;
    updated_at;
};
exports.Files = Files;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Files.prototype, "file_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: true }),
    __metadata("design:type", String)
], Files.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Files.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (userData) => userData.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], Files.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => tasks_entity_1.Tasks, (taskData) => taskData.task_id),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", String)
], Files.prototype, "task_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Files.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Files.prototype, "updated_at", void 0);
exports.Files = Files = __decorate([
    (0, typeorm_1.Entity)()
], Files);
//# sourceMappingURL=files_entity.js.map