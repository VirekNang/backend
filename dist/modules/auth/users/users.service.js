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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    systemPermissions = ['salescreen', 'pos', 'menu', 'orders', 'inventory', 'reports', 'accounting', 'users'];
    async syncAdministratorPermissions(userId, isAdmin) {
        await this.prisma.userPermission.deleteMany({
            where: { UserID: userId, PermissionName: { in: this.systemPermissions } },
        });
        if (isAdmin) {
            await this.prisma.userPermission.createMany({
                data: this.systemPermissions.map((PermissionName) => ({ UserID: userId, PermissionName })),
            });
        }
    }
    async saveFile(part) {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
        return filename;
    }
    async createUser(request) {
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
        const userId = parseInt(data.UserID);
        if (isNaN(userId)) {
            throw new common_1.NotFoundException('UserID must be a valid number matching an existing Employee');
        }
        const employee = await this.prisma.employee.findUnique({
            where: { EmployeeID: userId },
        });
        if (!employee) {
            if (filename) {
                const filepath = path.join(process.cwd(), 'uploads', filename);
                if (fs.existsSync(filepath))
                    fs.unlinkSync(filepath);
            }
            throw new common_1.NotFoundException(`Employee with ID ${userId} not found`);
        }
        const image = filename || data.Image || employee.PhotoURL || 'default.png';
        const rawPassword = (data.Password || '').trim();
        if (!rawPassword) {
            throw new Error('Password is required when creating a user account');
        }
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        try {
            const isAdmin = data.IsAdmin === 'true' || data.IsAdmin === true;
            const createdUser = await this.prisma.users.create({
                data: {
                    UserID: userId,
                    Username: data.Username,
                    Password: hashedPassword,
                    Email: data.Email,
                    Phone: data.Phone || '',
                    Image: image,
                    IsAdmin: isAdmin,
                    IsActive: data.IsActive === undefined ? true : (data.IsActive === 'true' || data.IsActive === true),
                    IsDuDate: data.IsDuDate ? new Date(data.IsDuDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                    IsDelete: false,
                },
            });
            await this.syncAdministratorPermissions(createdUser.UserID, isAdmin);
            return this.findOne(createdUser.uuid);
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
    async findAll() {
        return this.prisma.users.findMany({
            include: {
                Permissions: true,
            },
        });
    }
    async findOne(id) {
        const user = await this.prisma.users.findUnique({
            where: { uuid: id },
            include: {
                Permissions: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        return user;
    }
    async updateUser(id, request) {
        const user = await this.prisma.users.findUnique({
            where: { uuid: id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
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
        const updateData = {};
        if (data.Username !== undefined)
            updateData.Username = data.Username;
        if (data.Email !== undefined)
            updateData.Email = data.Email;
        if (data.Phone !== undefined)
            updateData.Phone = data.Phone;
        if (data.Password !== undefined && data.Password.trim() !== '') {
            updateData.Password = await bcrypt.hash(data.Password.trim(), 10);
        }
        if (filename) {
            updateData.Image = filename;
        }
        else if (data.Image !== undefined) {
            updateData.Image = data.Image;
        }
        if (data.IsAdmin !== undefined) {
            updateData.IsAdmin = data.IsAdmin === 'true' || data.IsAdmin === true;
        }
        if (data.IsActive !== undefined) {
            updateData.IsActive = data.IsActive === 'true' || data.IsActive === true;
        }
        if (data.IsDuDate !== undefined) {
            updateData.IsDuDate = new Date(data.IsDuDate);
        }
        if (data.IsDelete !== undefined) {
            updateData.IsDelete = data.IsDelete === 'true' || data.IsDelete === true;
        }
        try {
            const updatedUser = await this.prisma.users.update({
                where: { uuid: id },
                data: updateData,
                include: { Permissions: true },
            });
            if (data.IsAdmin !== undefined)
                await this.syncAdministratorPermissions(user.UserID, updatedUser.IsAdmin);
            if (filename && user.Image && user.Image.trim().toLowerCase() !== 'default.png') {
                const employee = await this.prisma.employee.findUnique({
                    where: { EmployeeID: user.UserID },
                });
                if (!employee || employee.PhotoURL !== user.Image) {
                    const oldFilePath = path.join(process.cwd(), 'uploads', user.Image);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
            }
            return updatedUser;
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
    async deleteUser(id) {
        const user = await this.prisma.users.findUnique({
            where: { uuid: id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const deletedUser = await this.prisma.users.delete({
            where: { uuid: id },
        });
        if (user.Image && user.Image.trim().toLowerCase() !== 'default.png') {
            const employee = await this.prisma.employee.findUnique({
                where: { EmployeeID: user.UserID },
            });
            if (!employee || employee.PhotoURL !== user.Image) {
                const filepath = path.join(process.cwd(), 'uploads', user.Image);
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            }
        }
        return deletedUser;
    }
    async addPermission(dto) {
        const existing = await this.prisma.userPermission.findFirst({
            where: { UserID: dto.UserID, PermissionName: dto.PermissionName },
        });
        return existing ?? this.prisma.userPermission.create({ data: dto });
    }
    async listPermissions(userId) {
        return this.prisma.userPermission.findMany({
            where: { UserID: userId },
        });
    }
    async removePermission(id) {
        return this.prisma.userPermission.delete({
            where: { UserPermissionID: id },
        });
    }
    async createLog(dto) {
        return null;
    }
    async listLogs(filter) {
        return [];
    }
    async initFirstAdmin() {
        try {
            const email = 'avery@umberandash.com';
            const password = '123456789';
            const hashedPassword = await bcrypt.hash(password, 10);
            let employee = await this.prisma.employee.findFirst({ where: { EmployeeName: 'Avery Admin' } });
            if (!employee) {
                employee = await this.prisma.employee.create({
                    data: {
                        EmployeeNo: 'EMP-0001',
                        EmployeeName: 'Avery Admin',
                        Gender: 'Male',
                        DateOfBirth: new Date('1990-01-01T00:00:00Z'),
                        Phone: '855123456789',
                        EducationStatus: 'Bachelor',
                        Address: 'Phnom Penh',
                        Department: 'Management',
                        Position: 'Admin',
                        HiredDate: new Date(),
                        BaseSalary: 1000.0,
                        PhotoURL: 'default.png',
                        IsActive: true,
                    },
                });
            }
            const existingUser = await this.prisma.users.findUnique({ where: { UserID: employee.EmployeeID } });
            if (!existingUser) {
                const u = await this.prisma.users.create({
                    data: {
                        UserID: employee.EmployeeID,
                        Username: 'avery',
                        Email: email,
                        Password: hashedPassword,
                        Phone: '855123456789',
                        Image: 'default.png',
                        IsAdmin: true,
                        IsActive: true,
                        IsDuDate: new Date('2030-01-01T00:00:00Z'),
                    },
                });
                await this.prisma.userPermission.create({
                    data: {
                        UserID: u.UserID,
                        PermissionName: 'CASHIER_ACCESS'
                    }
                });
                return { message: 'Admin user created successfully', email, password };
            }
            else {
                await this.prisma.users.update({
                    where: { UserID: employee.EmployeeID },
                    data: {
                        Password: hashedPassword,
                        Email: email,
                        IsAdmin: true,
                        IsActive: true
                    }
                });
                return { message: 'Admin user already exists. Password reset.', email, password };
            }
        }
        catch (error) {
            console.error(error);
            require('fs').writeFileSync('init-error.log', error.message + '\n' + error.stack);
            return { message: 'Init failed', error: error.message };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map