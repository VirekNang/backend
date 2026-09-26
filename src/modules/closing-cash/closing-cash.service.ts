import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClosingCashService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.cashSession.findMany({
            orderBy: { CashSessionID: 'desc' },
            include: {
                OpeningCash: {
                    include: { Employee: true },
                },
            },
        });
    }

    async GetById(id: number) {
        const session = await this.prisma.cashSession.findUnique({
            where: { CashSessionID: id },
            include: { OpeningCash: { include: { Employee: true } } },
        });
        if (!session) throw new NotFoundException('Cash session not found');
        return session;
    }

    async Create(data: any) {
        // Validate that the OpeningCash exists and is not already closed
        const openingCash = await this.prisma.openingCash.findUnique({
            where: { OpeningCashID: data.OpeningCashID },
            include: { CashSession: true },
        });
        if (!openingCash) throw new NotFoundException('Opening cash record not found');

        return this.prisma.cashSession.create({
            data: {
                OpeningCashID: data.OpeningCashID,
                ClosedBy: data.ClosedBy || null,
                ClosingCashDate: data.ClosingCashDate ? new Date(data.ClosingCashDate) : new Date(),
                TotalOrderCount: data.TotalOrderCount ?? 0,
                TotalOrderAmount: data.TotalOrderAmount ?? 0,
                Note: data.Note || '',
            },
            include: { OpeningCash: { include: { Employee: true } } },
        });
    }

    async Update(id: number, data: any) {
        const session = await this.prisma.cashSession.findUnique({ where: { CashSessionID: id } });
        if (!session) throw new NotFoundException('Cash session not found');

        return this.prisma.cashSession.update({
            where: { CashSessionID: id },
            data: {
                ClosedBy: data.ClosedBy,
                ClosingCashDate: data.ClosingCashDate ? new Date(data.ClosingCashDate) : undefined,
                TotalOrderCount: data.TotalOrderCount,
                TotalOrderAmount: data.TotalOrderAmount,
                Note: data.Note,
            },
            include: { OpeningCash: { include: { Employee: true } } },
        });
    }

    async Delete(id: number) {
        const session = await this.prisma.cashSession.findUnique({ where: { CashSessionID: id } });
        if (!session) throw new NotFoundException('Cash session not found');
        return this.prisma.cashSession.delete({ where: { CashSessionID: id } });
    }
}
