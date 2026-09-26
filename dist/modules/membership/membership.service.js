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
exports.MembershipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MembershipService = class MembershipService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    GetAll() {
        return this.prismaService.membership.findMany();
    }
    GetById(id) {
        return this.prismaService.membership.findUnique({
            where: {
                uuid: id,
            },
        });
    }
    Create(membership) {
        return this.prismaService.membership.create({
            data: membership,
        });
    }
    async Update(id, membership) {
        const existing = await this.prismaService.membership.findUnique({
            where: { uuid: id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Membership not found');
        }
        return this.prismaService.membership.update({
            where: {
                uuid: id,
            },
            data: membership,
        });
    }
    async Delete(id) {
        const existing = await this.prismaService.membership.findUnique({
            where: { uuid: id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Membership not found');
        }
        const customerCount = await this.prismaService.customer.count({
            where: { MembershipID: existing.MembershipID }
        });
        if (customerCount > 0) {
            throw new common_1.BadRequestException('Cannot delete membership tier that is assigned to customers');
        }
        return this.prismaService.membership.delete({
            where: {
                uuid: id,
            },
        });
    }
};
exports.MembershipService = MembershipService;
exports.MembershipService = MembershipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembershipService);
//# sourceMappingURL=membership.service.js.map