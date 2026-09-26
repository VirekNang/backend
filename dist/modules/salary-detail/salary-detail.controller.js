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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryDetailController = void 0;
const common_1 = require("@nestjs/common");
const salary_detail_service_1 = require("./salary-detail.service");
const SalaryDetail_dto_1 = require("./dto/SalaryDetail.dto");
let SalaryDetailController = class SalaryDetailController {
    salaryDetailService;
    constructor(salaryDetailService) {
        this.salaryDetailService = salaryDetailService;
    }
    GetAll() {
        return this.salaryDetailService.Get();
    }
    GetById(id) {
        return this.salaryDetailService.GetById(id);
    }
    Create(data) {
        return this.salaryDetailService.Create(data);
    }
    Update(id, data) {
        return this.salaryDetailService.Update(id, data);
    }
    Delete(id) {
        return this.salaryDetailService.Delete(id);
    }
};
exports.SalaryDetailController = SalaryDetailController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalaryDetailController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalaryDetailController.prototype, "GetById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SalaryDetail_dto_1.SalaryDetailDto]),
    __metadata("design:returntype", void 0)
], SalaryDetailController.prototype, "Create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SalaryDetail_dto_1.SalaryDetailDto]),
    __metadata("design:returntype", void 0)
], SalaryDetailController.prototype, "Update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalaryDetailController.prototype, "Delete", null);
exports.SalaryDetailController = SalaryDetailController = __decorate([
    (0, common_1.Controller)('salary-detail'),
    __metadata("design:paramtypes", [salary_detail_service_1.SalaryDetailService])
], SalaryDetailController);
//# sourceMappingURL=salary-detail.controller.js.map