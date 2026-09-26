import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PaymentMethodService {
    constructor(private readonly prisma: PrismaService) {}

    Get() {
        return this.prisma.paymentMethod.findMany();
    }

    GetById(id: string) {
        return this.prisma.paymentMethod.findUnique({ where: { uuid: id } });
    }

    private async savefile(part: any): Promise<string> {
        if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads', { recursive: true });
        const ext = part.filename.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        await fs.promises.writeFile(path.join(process.cwd(), 'uploads', filename), await part.toBuffer());
        return filename;
    }

    async Create(request: FastifyRequest) {
        let data: any = {};
        let filename: string = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') data[part.fieldname] = part.value;
                if (part.type === 'file') filename = await this.savefile(part);
            }
        } else {
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

    async Update(id: string, request: FastifyRequest) {
        let data: any = {};
        let filename: string = '';
        if (request.isMultipart()) {
            for await (const part of request.parts()) {
                if (part.type === 'field') data[part.fieldname] = part.value;
                if (part.type === 'file') filename = await this.savefile(part);
            }
        } else {
            data = request.body || {};
        }
        const paymentMethod = await this.prisma.paymentMethod.findUnique({ where: { uuid: id } });
        if (!paymentMethod) throw new NotFoundException('Payment method not found');
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

    async Delete(id: string) {
        const paymentMethod = await this.prisma.paymentMethod.findUnique({
            where: { uuid: id },
        });
        if (!paymentMethod) {
            throw new NotFoundException('Payment method not found');
        }
        const saleCount = await this.prisma.sale.count({
            where: { PaymentMethodID: paymentMethod.PaymentMethodID },
        });
        if (saleCount > 0) {
            throw new BadRequestException('Cannot delete payment method due to related sales');
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
}
