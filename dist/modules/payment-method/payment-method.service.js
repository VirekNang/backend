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
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let PaymentMethodService = class PaymentMethodService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.paymentMethod.findMany();
    }
    GetById(id) {
        return this.prisma.paymentMethod.findUnique({ where: { uuid: id } });
    }
    async savefile(part) {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads', { recursive: true });
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
                if (part.type === 'field')
                    data[part.fieldname] = part.value;
                if (part.type === 'file')
                    filename = await this.savefile(part);
            }
        }
        else {
            data = request.body || {};
        }
        const createdPaymentMethod = await this.prisma.paymentMethod.create({
            data: {
                PaymentMethodName: data.PaymentMethodName,
                Description: data.PaymentMethodDescription || data.Description || '',
                Image: filename || 'default.png',
                IsActive: data.IsActive === 'true' || data.IsActive === true,
            },
        });
        return { message: 'Payment method created successfully', data: createdPaymentMethod };
    }
    async Update(id, request) {
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field')
                    data[part.fieldname] = part.value;
                if (part.type === 'file')
                    filename = await this.savefile(part);
            }
        }
        else {
            data = request.body || {};
        }
        const paymentMethod = await this.prisma.paymentMethod.findUnique({ where: { uuid: id } });
        if (!paymentMethod)
            throw new common_1.NotFoundException('Payment method not found');
        let imageToSave = paymentMethod.Image;
        if (filename) {
            imageToSave = filename;
            if (paymentMethod.Image && paymentMethod.Image.trim().toLowerCase() !== 'default.png') {
                const filepath = path.join(process.cwd(), 'uploads', paymentMethod.Image);
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            }
        }
        const updatedPaymentMethod = await this.prisma.paymentMethod.update({
            where: { uuid: id },
            data: {
                PaymentMethodName: data.PaymentMethodName,
                Description: data.PaymentMethodDescription || data.Description || undefined,
                Image: imageToSave,
                IsActive: data.IsActive !== undefined ? (data.IsActive === 'true' || data.IsActive === true) : undefined,
            },
        });
        return { message: 'Payment method updated successfully', data: updatedPaymentMethod };
    }
    async Delete(id) {
        const paymentMethod = await this.prisma.paymentMethod.findUnique({
            where: { uuid: id },
        });
        if (!paymentMethod) {
            throw new common_1.NotFoundException('Payment method not found');
        }
        const saleCount = await this.prisma.sale.count({
            where: { PaymentMethodID: paymentMethod.PaymentMethodID },
        });
        if (saleCount > 0) {
            throw new common_1.BadRequestException('Cannot delete payment method due to related sales');
        }
        await this.prisma.paymentMethod.delete({
            where: { uuid: id },
        });
        if (paymentMethod.Image && paymentMethod.Image.trim().toLowerCase() !== 'default.png') {
            const filepath = path.join(process.cwd(), 'uploads', paymentMethod.Image);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        return { message: 'Payment method deleted successfully' };
    }
};
exports.PaymentMethodService = PaymentMethodService;
exports.PaymentMethodService = PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentMethodService);
//# sourceMappingURL=payment-method.service.js.map