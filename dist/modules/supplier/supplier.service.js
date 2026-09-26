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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const node_path_1 = __importDefault(require("node:path"));
let SupplierService = class SupplierService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    GetAll() {
        return this.prisma.supplier.findMany();
    }
    GetById(id) {
        return this.prisma.supplier.findUnique({
            where: { uuid: id },
        });
    }
    async Create(request) {
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            const parts = request.parts();
            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads');
            }
            for await (const part of parts) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                if (part.type === 'file') {
                    const ext = part.filename.split('.').pop();
                    filename = Date.now() + '.' + ext;
                    const filepath = node_path_1.default.join(process.cwd(), 'uploads', filename);
                    await fs.promises.writeFile(filepath, await part.toBuffer());
                }
            }
        }
        else {
            data = request.body || {};
        }
        try {
            const isActive = data.IsActive === 'true' ||
                data.IsActive === true ||
                data.Status === 'true' ||
                data.Status === true
                ? true
                : false;
            const supplier = await this.prisma.supplier.create({
                data: {
                    SupplierName: data.SupplierName,
                    Phone: data.Phone || data.phone || '',
                    Address: data.Address || data.address || '',
                    Description: data.Description || data.description || data.Note || '',
                    IsActive: isActive,
                    Thumnail: filename,
                },
            });
            return { message: 'Supplier created successfully', data: supplier };
        }
        catch (error) {
            if (filename) {
                const filepath = process.cwd() + `/uploads/${filename}`;
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            }
            throw error;
        }
    }
    async Update(id, request) {
        let data = {};
        let newfilename = null;
        if (request.isMultipart()) {
            const parts = request.parts();
            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads', { recursive: true });
            }
            for await (const part of parts) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                else if (part.type === 'file') {
                    const ext = node_path_1.default.extname(part.filename);
                    newfilename = Date.now() + ext;
                    const filepath = node_path_1.default.join(process.cwd(), 'uploads', newfilename);
                    await fs.promises.writeFile(filepath, await part.toBuffer());
                }
            }
        }
        else {
            data = request.body || {};
        }
        const oldSupplier = await this.prisma.supplier.findUnique({
            where: { uuid: id },
        });
        if (!oldSupplier)
            throw new common_1.NotFoundException('Supplier not found');
        if (newfilename &&
            oldSupplier.Thumnail &&
            oldSupplier.Thumnail.trim().toLowerCase() !== 'default.png') {
            const oldimage = oldSupplier.Thumnail.trim().toLowerCase();
            if (oldimage && oldimage !== 'default.png') {
                const filepath = node_path_1.default.join(process.cwd(), 'uploads', oldSupplier.Thumnail);
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            }
        }
        const isActive = data.IsActive === 'true' ||
            data.IsActive === true ||
            data.Status === 'true' ||
            data.Status === true
            ? true
            : false;
        await this.prisma.supplier.update({
            where: { uuid: id },
            data: {
                SupplierName: data.SupplierName || oldSupplier.SupplierName,
                Phone: data.Phone || data.phone || oldSupplier.Phone,
                Address: data.Address || data.address || oldSupplier.Address,
                Description: data.Description || data.description || data.Note || oldSupplier.Description,
                IsActive: isActive,
                Thumnail: newfilename || oldSupplier.Thumnail,
            },
        });
        return { message: 'Supplier updated successfully' };
    }
    async Delete(id) {
        const supplier = await this.prisma.supplier.findUnique({
            where: { uuid: id },
        });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
        const purchaseCount = await this.prisma.purchase.count({
            where: { SupplierID: supplier.SupplierID },
        });
        if (purchaseCount > 0) {
            throw new common_1.BadRequestException('Cannot delete a supplier with associated purchases');
        }
        if (supplier.Thumnail &&
            supplier.Thumnail.trim().toLowerCase() !== 'default.png') {
            const filepath = node_path_1.default.join(process.cwd(), 'uploads', supplier.Thumnail);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        await this.prisma.supplier.delete({
            where: { uuid: id },
        });
        return { message: 'Supplier deleted successfully' };
    }
};
exports.SupplierService = SupplierService;
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupplierService.prototype, "Update", null);
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map