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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CustomerService = class CustomerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    GetAll() {
        return this.prisma.customer.findMany({});
    }
    async GetById(id) {
        return this.prisma.customer.findUnique({
            where: {
                uuid: id,
            },
            include: { membership: true, }
        });
    }
    async Create(customer) {
        const lastCustomer = await this.prisma.customer.findFirst({
            orderBy: {
                CustomerID: 'desc',
            },
        });
        let nextNumber = 1;
        if (lastCustomer && lastCustomer.CustomerNo && lastCustomer.CustomerNo.startsWith('CUT-')) {
            const lastNumberStr = lastCustomer.CustomerNo.replace('CUT-', '');
            const lastNumber = parseInt(lastNumberStr, 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }
        const newCustomerNo = `CUT-${nextNumber}`;
        const data = {
            ...customer,
            CustomerNo: newCustomerNo,
        };
        return this.prisma.customer.create({
            data: data
        });
    }
    async Update(id, customer) {
        const existing = await this.prisma.customer.findUnique({ where: { uuid: id } });
        if (!existing)
            throw new common_1.NotFoundException('Customer not found');
        return this.prisma.customer.update({
            where: {
                uuid: id,
            },
            data: customer
        });
    }
    async Delete(id) {
        const existing = await this.prisma.customer.findUnique({ where: { uuid: id } });
        if (!existing)
            throw new common_1.NotFoundException('Customer not found');
        if (await this.prisma.sale.count({ where: { CustomerID: existing.CustomerID } })) {
            throw new common_1.BadRequestException('Cannot delete customer with existing sales');
        }
        return this.prisma.customer.delete({ where: { uuid: id } });
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map