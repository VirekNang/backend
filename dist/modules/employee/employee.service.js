"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma_service_1 = require("../../prisma/prisma.service");
let EmployeeService = class EmployeeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.employee.findMany({
            orderBy: { EmployeeID: 'desc' }
        });
    }
    GetById(id) {
        return this.prisma.employee.findUnique({ where: { uuid: id } });
    }
    async saveFile(part) {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
        return filename;
    }
    async Create(request) {
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
                    filename = await this.saveFile(part);
                }
            }
        }
        else {
            data = request.body || {};
        }
        const isActive = data.IsActive === 'true' || data.IsActive === true;
        try {
            const lastEmployee = await this.prisma.employee.findFirst({
                orderBy: { EmployeeID: 'desc' }
            });
            const nextId = lastEmployee ? lastEmployee.EmployeeID + 1 : 1;
            const employeeNo = data.EmployeeNo || `EMP-${String(nextId).padStart(4, '0')}`;
            const employee = await this.prisma.employee.create({
                data: {
                    EmployeeNo: employeeNo,
                    EmployeeName: data.EmployeeName || 'New Employee',
                    Gender: data.Gender || 'Other',
                    DateOfBirth: data.DateOfBirth ? new Date(data.DateOfBirth) : new Date(),
                    Indentity: data.Indentity ? parseInt(data.Indentity, 10) : null,
                    Phone: data.Phone || '',
                    EducationStatus: data.EducationStatus || '',
                    Address: data.Address || '',
                    Department: data.Department || 'Staff',
                    Position: data.Position || 'Staff',
                    HiredDate: data.HiredDate ? new Date(data.HiredDate) : new Date(),
                    BaseSalary: data.BaseSalary ? parseFloat(data.BaseSalary) : 0,
                    PhotoURL: filename || data.PhotoURL || 'default.png',
                    IsActive: isActive,
                    IsDelete: null,
                },
            });
            return { message: 'Employee created successfully', data: employee };
        }
        catch (error) {
            if (filename) {
                const filepath = path.join(process.cwd(), 'uploads', filename);
                if (fs.existsSync(filepath))
                    fs.unlinkSync(filepath);
            }
            throw error;
        }
    }
    async Update(id, request) {
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                else if (part.type === 'file' && part.filename && part.filename.trim() !== '') {
                    filename = await this.saveFile(part);
                }
            }
        }
        else {
            data = request.body || {};
        }
        const employee = await this.prisma.employee.findUnique({ where: { uuid: id } });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        const updateData = {};
        if (data.EmployeeName !== undefined)
            updateData.EmployeeName = data.EmployeeName;
        if (data.Gender !== undefined)
            updateData.Gender = data.Gender;
        if (data.DateOfBirth)
            updateData.DateOfBirth = new Date(data.DateOfBirth);
        if (data.Indentity !== undefined && data.Indentity !== '')
            updateData.Indentity = parseInt(data.Indentity, 10);
        if (data.Phone !== undefined)
            updateData.Phone = data.Phone;
        if (data.EducationStatus !== undefined)
            updateData.EducationStatus = data.EducationStatus;
        if (data.Address !== undefined)
            updateData.Address = data.Address;
        if (data.Department !== undefined)
            updateData.Department = data.Department;
        if (data.Position !== undefined)
            updateData.Position = data.Position;
        if (data.HiredDate)
            updateData.HiredDate = new Date(data.HiredDate);
        if (data.BaseSalary !== undefined && data.BaseSalary !== '')
            updateData.BaseSalary = parseFloat(data.BaseSalary);
        if (data.IsActive !== undefined)
            updateData.IsActive = data.IsActive === 'true' || data.IsActive === true;
        if (filename) {
            updateData.PhotoURL = filename;
        }
        else if (data.PhotoURL !== undefined) {
            updateData.PhotoURL = data.PhotoURL;
        }
        try {
            const updatedEmployee = await this.prisma.employee.update({
                where: { uuid: id },
                data: updateData,
            });
            if (filename && employee.PhotoURL && employee.PhotoURL.trim().toLowerCase() !== 'default.png') {
                const oldFilePath = path.join(process.cwd(), 'uploads', employee.PhotoURL);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            return { message: 'Employee updated successfully', data: updatedEmployee };
        }
        catch (error) {
            if (filename) {
                const filepath = path.join(process.cwd(), 'uploads', filename);
                if (fs.existsSync(filepath))
                    fs.unlinkSync(filepath);
            }
            throw error;
        }
    }
    async Delete(id) {
        const employee = await this.prisma.employee.findUnique({ where: { uuid: id } });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        const deletedEmployee = await this.prisma.employee.delete({
            where: { uuid: id },
        });
        if (employee.PhotoURL && employee.PhotoURL.trim().toLowerCase() !== 'default.png') {
            const filepath = path.join(process.cwd(), 'uploads', employee.PhotoURL);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        return { message: 'Employee deleted successfully', data: deletedEmployee };
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map