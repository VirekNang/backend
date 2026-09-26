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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../public.decorator");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(request) {
        return this.usersService.createUser(request);
    }
    findAll() {
        return this.usersService.findAll();
    }
    addPermission(dto) {
        return this.usersService.addPermission(dto);
    }
    listPermissions(userId) {
        return this.usersService.listPermissions(userId);
    }
    removePermission(id) {
        return this.usersService.removePermission(id);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, request) {
        return this.usersService.updateUser(id, request);
    }
    remove(id) {
        return this.usersService.deleteUser(id);
    }
    createLog(dto) {
        return this.usersService.createLog(dto);
    }
    listLogs(userId, tableName) {
        return this.usersService.listLogs({ userId, tableName });
    }
    async initAdmin() {
        const bcrypt = require('bcrypt');
        const hashed = await bcrypt.hash('123456789', 10);
        const result = await this.usersService['prisma'].users.updateMany({
            where: { Email: 'avery@umberandash.com' },
            data: {
                Password: hashed,
                PinCode: '444444',
                Phone: '012345678'
            }
        });
        return { message: 'Admin account reset', count: result.count };
    }
    async debugUsers() {
        await this.usersService['prisma'].device.deleteMany();
        await this.usersService['prisma'].deviceVerificationRequest.deleteMany();
        return { message: 'All devices and verification requests cleared' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                UserID: { type: 'number', description: 'Must match an existing EmployeeID' },
                Username: { type: 'string' },
                Password: { type: 'string' },
                Email: { type: 'string' },
                Phone: { type: 'string' },
                Image: { type: 'string', format: 'binary', description: 'Upload file or pass string value' },
                IsAdmin: { type: 'boolean', default: false },
                IsActive: { type: 'boolean', default: true },
                IsDuDate: { type: 'string', format: 'date-time' },
                IsDelete: { type: 'boolean', default: false }
            },
            required: ['UserID', 'Username', 'Password', 'Email', 'Phone', 'IsDuDate']
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully created.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('permissions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePermissionDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addPermission", null);
__decorate([
    (0, common_1.Get)('permissions/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "listPermissions", null);
__decorate([
    (0, common_1.Delete)('permissions/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removePermission", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                Username: { type: 'string' },
                Password: { type: 'string' },
                Email: { type: 'string' },
                Phone: { type: 'string' },
                Image: { type: 'string', format: 'binary', description: 'Upload file or pass string value' },
                IsAdmin: { type: 'boolean' },
                IsActive: { type: 'boolean' },
                IsDuDate: { type: 'string', format: 'date-time' },
                IsDelete: { type: 'boolean' }
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('audit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAuditLogDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createLog", null);
__decorate([
    (0, common_1.Get)('audit'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "listLogs", null);
__decorate([
    (0, common_1.Post)('init'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "initAdmin", null);
__decorate([
    (0, common_1.Get)('debug'),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "debugUsers", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map