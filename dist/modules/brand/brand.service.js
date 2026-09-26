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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
require("@fastify/multipart");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const prisma_service_1 = require("../../prisma/prisma.service");
let BrandService = class BrandService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    GetAll() { return this.prisma.brand.findMany(); }
    GetById(id) { return this.prisma.brand.findUnique({ where: { uuid: id } }); }
    async Create(request) {
        const { data, imageName } = await this.readRequest(request);
        if (!data.BrandName) {
            await this.removeImage(imageName);
            throw new common_1.BadRequestException('BrandName is required');
        }
        try {
            const brand = await this.prisma.brand.create({ data: {
                    BrandName: data.BrandName,
                    Description: data.Description ?? data.description ?? null,
                    IsActive: this.toBoolean(data.IsActive, true),
                    Image: imageName,
                } });
            return { message: 'Brand created successfully', data: brand };
        }
        catch (error) {
            await this.removeImage(imageName);
            throw error;
        }
    }
    async Update(id, request) {
        const { data, imageName } = await this.readRequest(request);
        const existing = await this.GetById(id);
        if (!existing)
            throw new common_1.NotFoundException('Brand not found');
        try {
            const brand = await this.prisma.brand.update({ where: { uuid: id }, data: {
                    BrandName: data.BrandName ?? existing.BrandName,
                    Description: data.Description ?? data.description ?? existing.Description,
                    IsActive: data.IsActive === undefined ? existing.IsActive : this.toBoolean(data.IsActive),
                    Image: imageName ?? existing.Image,
                } });
            if (imageName && existing.Image)
                await this.removeImage(existing.Image);
            return { message: 'Brand updated successfully', data: brand };
        }
        catch (error) {
            await this.removeImage(imageName);
            throw error;
        }
    }
    async Delete(id) {
        const existing = await this.GetById(id);
        if (!existing)
            throw new common_1.NotFoundException('Brand not found');
        if (await this.prisma.item.count({ where: { BrandID: existing.BrandID } })) {
            throw new common_1.BadRequestException('Cannot delete a brand with associated items');
        }
        await this.prisma.brand.delete({ where: { uuid: id } });
        await this.removeImage(existing.Image);
        return { message: 'Brand deleted successfully' };
    }
    async readRequest(request) {
        const data = {};
        let imageName = null;
        if (!request.isMultipart())
            return { data: request.body ?? {}, imageName };
        const uploadsDir = node_path_1.default.join(process.cwd(), 'uploads');
        await node_fs_1.promises.mkdir(uploadsDir, { recursive: true });
        for await (const part of request.parts()) {
            if (part.type === 'field') {
                data[part.fieldname] = part.value;
                continue;
            }
            const extension = node_path_1.default.extname(part.filename || '');
            imageName = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`;
            await node_fs_1.promises.writeFile(node_path_1.default.join(uploadsDir, imageName), await part.toBuffer());
        }
        return { data, imageName };
    }
    toBoolean(value, defaultValue = false) {
        if (value === undefined || value === null || value === '')
            return defaultValue;
        return value === true || value === 'true';
    }
    async removeImage(imageName) {
        if (!imageName || imageName.trim().toLowerCase() === 'default.png')
            return;
        try {
            await node_fs_1.promises.unlink(node_path_1.default.join(process.cwd(), 'uploads', imageName));
        }
        catch (error) {
            if (error.code !== 'ENOENT')
                throw error;
        }
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrandService);
//# sourceMappingURL=brand.service.js.map