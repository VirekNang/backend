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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ExpenseService = class ExpenseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    Get() {
        return this.prisma.expense.findMany({
            orderBy: { ExpenseID: 'desc' },
            include: { employee: true },
        });
    }
    async GetById(id) {
        const expense = await this.prisma.expense.findUnique({
            where: { ExpenseID: id },
            include: { employee: true },
        });
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        return expense;
    }
    GetByCategory(category) {
        return this.prisma.expense.findMany({
            where: { Category: category },
            orderBy: { ExpenseDate: 'desc' },
            include: { employee: true },
        });
    }
    async saveFile(part) {
        if (!fs.existsSync('./uploads'))
            fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `expense_${Date.now()}.${ext}`;
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
                else if (part.type === 'file' && part.filename?.trim()) {
                    filename = await this.saveFile(part);
                }
            }
        }
        else {
            data = request.body || {};
        }
        const expense = await this.prisma.expense.create({
            data: {
                Title: data.Title,
                Amount: parseFloat(data.Amount || '0'),
                Category: data.Category || null,
                Description: data.Description || null,
                Image: filename || data.Image || null,
                EmployeeID: data.EmployeeID ? parseInt(data.EmployeeID, 10) : null,
                ExpenseDate: data.ExpenseDate ? new Date(data.ExpenseDate) : new Date(),
            },
            include: { employee: true },
        });
        return { message: 'Expense created successfully', data: expense };
    }
    async Update(id, request) {
        const expense = await this.prisma.expense.findUnique({ where: { ExpenseID: id } });
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        let data = {};
        let filename = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                }
                else if (part.type === 'file' && part.filename?.trim()) {
                    filename = await this.saveFile(part);
                }
            }
        }
        else {
            data = request.body || {};
        }
        const updateData = {};
        if (data.Title !== undefined)
            updateData.Title = data.Title;
        if (data.Amount !== undefined && !isNaN(parseFloat(data.Amount)))
            updateData.Amount = parseFloat(data.Amount);
        if (data.Category !== undefined)
            updateData.Category = data.Category;
        if (data.Description !== undefined)
            updateData.Description = data.Description;
        if (data.EmployeeID !== undefined)
            updateData.EmployeeID = data.EmployeeID ? parseInt(data.EmployeeID, 10) : null;
        if (data.ExpenseDate !== undefined)
            updateData.ExpenseDate = new Date(data.ExpenseDate);
        if (filename) {
            updateData.Image = filename;
            if (expense.Image) {
                const oldPath = path.join(process.cwd(), 'uploads', expense.Image);
                if (fs.existsSync(oldPath))
                    fs.unlinkSync(oldPath);
            }
        }
        else if (data.Image !== undefined) {
            updateData.Image = data.Image;
        }
        const updated = await this.prisma.expense.update({
            where: { ExpenseID: id },
            data: updateData,
            include: { employee: true },
        });
        return { message: 'Expense updated successfully', data: updated };
    }
    async Delete(id) {
        const expense = await this.prisma.expense.findUnique({ where: { ExpenseID: id } });
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        if (expense.Image) {
            const filepath = path.join(process.cwd(), 'uploads', expense.Image);
            if (fs.existsSync(filepath))
                fs.unlinkSync(filepath);
        }
        const deleted = await this.prisma.expense.delete({ where: { ExpenseID: id } });
        return { message: 'Expense deleted successfully', data: deleted };
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map