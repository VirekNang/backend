import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OpeningCashService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.openingCash.findMany({
            orderBy: { OpeningCashID: 'desc' },
            include: {
                Employee: true,
                CashSession: true,
            },
        });
    }

    async GetById(id: number) {
        const record = await this.prisma.openingCash.findUnique({
            where: { OpeningCashID: id },
            include: { Employee: true, CashSession: true },
        });
        if (!record) throw new NotFoundException('Opening cash record not found');
        return record;
    }

    /** Get the currently open (not yet closed) cash session for an employee */
    async GetActiveByEmployee(employeeId: number) {
        return this.prisma.openingCash.findFirst({
            where: {
                EmployeeID: employeeId,
                CashSession: { none: {} },
            },
            orderBy: { OpeningCashDate: 'desc' },
            include: { Employee: true, CashSession: true },
        });
    }

    async Create(data: any) {
        return this.prisma.openingCash.create({
            data: {
                EmployeeID: data.EmployeeID || null,
                OpeningCashDate: data.OpeningCashDate ? new Date(data.OpeningCashDate) : new Date(),
                OpeningCashBy: data.OpeningCashBy,
                Note: data.Note || '',
            },
            include: { Employee: true },
        });
    }

    async Update(id: number, data: any) {
        const record = await this.prisma.openingCash.findUnique({ where: { OpeningCashID: id } });
        if (!record) throw new NotFoundException('Opening cash record not found');

        return this.prisma.openingCash.update({
            where: { OpeningCashID: id },
            data: {
                EmployeeID: data.EmployeeID,
                OpeningCashBy: data.OpeningCashBy,
                Note: data.Note,
            },
            include: { Employee: true },
        });
    }

    async Delete(id: number) {
        const record = await this.prisma.openingCash.findUnique({ where: { OpeningCashID: id } });
        if (!record) throw new NotFoundException('Opening cash record not found');
        return this.prisma.openingCash.delete({ where: { OpeningCashID: id } });
    }
}
