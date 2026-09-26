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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
require("@fastify/multipart");
const fs = __importStar(require("fs"));
const win32_1 = __importDefault(require("path/win32"));
const prisma_service_1 = require("../../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.categories.findMany();
    }
    GetbyId(id) {
        return this.prisma.categories.findUnique({
            where: { uuid: id },
        });
    }
    async Create(request) {
        let data = {};
        let filename = "";
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
                    const filepath = win32_1.default.join(process.cwd(), 'uploads', filename);
                    await fs.promises.writeFile(filepath, await part.toBuffer());
                }
            }
        }
        else {
            data = request.body || {};
        }
        try {
            const isActive = (data.IsActive === 'true' || data.IsActive === true || data.Status === 'true' || data.Status === true) ? true : false;
            const categories = await this.prisma.categories.create({
                data: {
                    CategoryName: data.CategoryName,
                    Description: data.Description || data.description || data.Note || '',
                    IsActive: isActive,
                    Thumnail: filename
                }
            });
            return { message: 'Category created successfully', data: categories };
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
        let newFileName = null;
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
                    const ext = win32_1.default.extname(part.filename);
                    newFileName = Date.now() + ext;
                    const filepath = win32_1.default.join(process.cwd(), 'uploads', newFileName);
                    await fs.promises.writeFile(filepath, await part.toBuffer());
                }
            }
        }
        else {
            data = request.body || {};
        }
        const oldCategory = await this.prisma.categories.findUnique({
            where: { uuid: id }
        });
        if (!oldCategory) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (newFileName && oldCategory?.Thumnail) {
            const oldimage = oldCategory.Thumnail.trim().toLowerCase();
            if (oldimage && oldimage !== 'default.png') {
                const oldPath = win32_1.default.join(process.cwd(), 'uploads', oldimage);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }
        const statusValue = (data.IsActive !== undefined)
            ? (data.IsActive === 'true' || data.IsActive === true ? true : false)
            : (data.Status !== undefined ? (data.Status === 'true' || data.Status === true ? true : false) : oldCategory?.IsActive);
        await this.prisma.categories.update({
            where: { uuid: id },
            data: {
                CategoryName: data.CategoryName || oldCategory?.CategoryName,
                Description: data.Description || data.description || data.Note || oldCategory?.Description,
                IsActive: statusValue,
                Thumnail: newFileName || oldCategory?.Thumnail
            }
        });
        return { message: 'Category updated successfully' };
    }
    async Delete(id) {
        const Category = await this.prisma.categories.findUnique({
            where: {
                uuid: id
            }
        });
        if (!Category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const itemCount = await this.prisma.item.count({
            where: { CategoryID: Category.CategoryID },
        });
        if (itemCount > 0) {
            throw new common_1.BadRequestException('Cannot delete a category with associated products');
        }
        if (Category.Thumnail && Category.Thumnail.trim().toLowerCase() !== 'default.png') {
            const imagePath = win32_1.default.join(process.cwd(), 'uploads', Category.Thumnail);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await this.prisma.categories.delete({
            where: {
                uuid: id
            }
        });
        return { message: 'Category Deleted Successfully' };
    }
};
exports.CategoriesService = CategoriesService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesService.prototype, "Create", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesService.prototype, "Update", null);
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map