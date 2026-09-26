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
exports.SalaryDetailService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SalaryDetailService = class SalaryDetailService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.salaryDetail.findMany();
    }
    GetById(id) {
        return this.prisma.salaryDetail.findUnique({
            where: { uuid: id },
            include: { Employee: true }
        });
    }
    Create(data) {
        return this.prisma.salaryDetail.create({
            data: {
                EmployeeID: data.EmployeeID,
                Bonus: data.Bonus,
                Month: data.Month,
                Year: data.Year,
                SalaryOfMonth: data.SalaryOfMonth ?? 0,
                TotalSalary: data.TotalSalary ?? 0,
                Note: data.Note ?? '',
            }
        });
    }
    Update(id, data) {
        return this.prisma.salaryDetail.update({
            where: { uuid: id },
            data: {
                EmployeeID: data.EmployeeID,
                Bonus: data.Bonus,
                Month: data.Month,
                Year: data.Year,
                SalaryOfMonth: data.SalaryOfMonth !== undefined ? data.SalaryOfMonth : undefined,
                TotalSalary: data.TotalSalary !== undefined ? data.TotalSalary : undefined,
                Note: data.Note,
            }
        });
    }
    Delete(id) {
        return this.prisma.salaryDetail.delete({
            where: { uuid: id }
        });
    }
};
exports.SalaryDetailService = SalaryDetailService;
exports.SalaryDetailService = SalaryDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalaryDetailService);
//# sourceMappingURL=salary-detail.service.js.map