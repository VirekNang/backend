import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { FastifyRequest } from 'fastify';

@Injectable()
export class ExpenseService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.expense.findMany({
            orderBy: { ExpenseID: 'desc' },
            include: { employee: true },
        });
    }

    async GetById(id: number) {
        const expense = await this.prisma.expense.findUnique({
            where: { ExpenseID: id },
            include: { employee: true },
        });
        if (!expense) throw new NotFoundException('Expense not found');
        return expense;
    }

    GetByCategory(category: string) {
        return this.prisma.expense.findMany({
            where: { Category: category },
            orderBy: { ExpenseDate: 'desc' },
            include: { employee: true },
        });
    }

    private async saveFile(part: any): Promise<string> {
        if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
        const ext = part.filename.split('.').pop();
        const filename = `expense_${Date.now()}.${ext}`;
        await fs.promises.writeFile(
            path.join(process.cwd(), 'uploads', filename),
            await part.toBuffer(),
        );
        return filename;
    }

    async Create(request: FastifyRequest) {
        let data: any = {};
        let filename = '';

        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                } else if (part.type === 'file' && part.filename?.trim()) {
                    filename = await this.saveFile(part);
                }
            }
        } else {
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

    async Update(id: number, request: FastifyRequest) {
        const expense = await this.prisma.expense.findUnique({ where: { ExpenseID: id } });
        if (!expense) throw new NotFoundException('Expense not found');

        let data: any = {};
        let filename = '';

        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') {
                    data[part.fieldname] = part.value;
                } else if (part.type === 'file' && part.filename?.trim()) {
                    filename = await this.saveFile(part);
                }
            }
        } else {
            data = request.body || {};
        }

        const updateData: any = {};
        if (data.Title !== undefined) updateData.Title = data.Title;
        if (data.Amount !== undefined && !isNaN(parseFloat(data.Amount))) updateData.Amount = parseFloat(data.Amount);
        if (data.Category !== undefined) updateData.Category = data.Category;
        if (data.Description !== undefined) updateData.Description = data.Description;
        if (data.EmployeeID !== undefined) updateData.EmployeeID = data.EmployeeID ? parseInt(data.EmployeeID, 10) : null;
        if (data.ExpenseDate !== undefined) updateData.ExpenseDate = new Date(data.ExpenseDate);

        if (filename) {
            updateData.Image = filename;
            // Delete old image if not default
            if (expense.Image) {
                const oldPath = path.join(process.cwd(), 'uploads', expense.Image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        } else if (data.Image !== undefined) {
            updateData.Image = data.Image;
        }

        const updated = await this.prisma.expense.update({
            where: { ExpenseID: id },
            data: updateData,
            include: { employee: true },
        });
        return { message: 'Expense updated successfully', data: updated };
    }

    async Delete(id: number) {
        const expense = await this.prisma.expense.findUnique({ where: { ExpenseID: id } });
        if (!expense) throw new NotFoundException('Expense not found');

        if (expense.Image) {
            const filepath = path.join(process.cwd(), 'uploads', expense.Image);
            if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        }

        const deleted = await this.prisma.expense.delete({ where: { ExpenseID: id } });
        return { message: 'Expense deleted successfully', data: deleted };
    }
}
