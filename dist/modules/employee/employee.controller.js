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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const employee_service_1 = require("./employee.service");
let EmployeeController = class EmployeeController {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    GetAll() {
        return this.employeeService.Get();
    }
    GetById(id) {
        return this.employeeService.GetById(id);
    }
    Create(request) {
        return this.employeeService.Create(request);
    }
    Update(id, request) {
        return this.employeeService.Update(id, request);
    }
    Delete(id) {
        return this.employeeService.Delete(id);
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "GetById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                EmployeeName: { type: 'string' },
                Gender: { type: 'string' },
                DateOfBirth: { type: 'string', format: 'date' },
                Indentity: { type: 'number' },
                Phone: { type: 'string' },
                EducationStatus: { type: 'string' },
                Address: { type: 'string' },
                Department: { type: 'string' },
                Position: { type: 'string' },
                HiredDate: { type: 'string', format: 'date' },
                BaseSalary: { type: 'number' },
                PhotoURL: { type: 'string', format: 'binary' },
                IsActive: { type: 'boolean' }
            }
        }
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "Create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                EmployeeName: { type: 'string' },
                Gender: { type: 'string' },
                DateOfBirth: { type: 'string', format: 'date' },
                Indentity: { type: 'number' },
                Phone: { type: 'string' },
                EducationStatus: { type: 'string' },
                Address: { type: 'string' },
                Department: { type: 'string' },
                Position: { type: 'string' },
                HiredDate: { type: 'string', format: 'date' },
                BaseSalary: { type: 'number' },
                PhotoURL: { type: 'string', format: 'binary' },
                IsActive: { type: 'boolean' }
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "Update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "Delete", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map