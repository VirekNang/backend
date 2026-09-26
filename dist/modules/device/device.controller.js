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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DeviceController = class DeviceController {
    deviceService;
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    ensureAdministrator(request) {
        const hasAdminPerms = request.user?.IsAdmin;
        if (!hasAdminPerms) {
            throw new common_1.ForbiddenException('Only administrators can manage device approvals');
        }
    }
    getPendingRequests(request) {
        this.ensureAdministrator(request);
        return this.deviceService.getPendingRequests();
    }
    approveRequest(body, request) {
        this.ensureAdministrator(request);
        return this.deviceService.approveRequest(body.requestId);
    }
    rejectRequest(body, request) {
        this.ensureAdministrator(request);
        return this.deviceService.rejectRequest(body.requestId);
    }
    getBlockedDevices(request) {
        this.ensureAdministrator(request);
        return this.deviceService.getBlockedDevices();
    }
    unblockDevice(body, request) {
        this.ensureAdministrator(request);
        return this.deviceService.unblockDevice(body.deviceId);
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Post)('approve'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "approveRequest", null);
__decorate([
    (0, common_1.Post)('reject'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Get)('blocked'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "getBlockedDevices", null);
__decorate([
    (0, common_1.Post)('unblock'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "unblockDevice", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('admin/devices'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
//# sourceMappingURL=device.controller.js.map