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
exports.Projects = void 0;
const typeorm_1 = require("typeorm");
let Projects = class Projects {
    project_id;
    name;
    description;
    user_ids;
    start_time;
    end_time;
    created_at;
    updated_at;
};
exports.Projects = Projects;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Projects.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: false, unique: true }),
    __metadata("design:type", String)
], Projects.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Projects.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { array: true, default: [] }),
    __metadata("design:type", Array)
], Projects.prototype, "user_ids", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Projects.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Projects.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Projects.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Projects.prototype, "updated_at", void 0);
exports.Projects = Projects = __decorate([
    (0, typeorm_1.Entity)()
], Projects);
//# sourceMappingURL=projects_entity.js.map