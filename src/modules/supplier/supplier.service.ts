import { BadRequestException, Injectable, NotFoundException, Param, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import path from 'node:path';
@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}
  GetAll() {
    return this.prisma.supplier.findMany();
  }
  GetById(id: string) {
    return this.prisma.supplier.findUnique({
      where: { uuid: id },
    });
  }
  async Create(request: FastifyRequest) {
    let data: any = {};
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
          const filepath = path.join(process.cwd(), 'uploads', filename);
          await fs.promises.writeFile(filepath, await part.toBuffer());
        }
      }
    } else {
      data = request.body || {};
    }
    try {
      const isActive =
        data.IsActive === 'true' ||
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
    } catch (error) {
      if (filename) {
        const filepath = process.cwd() + `/uploads/${filename}`;
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
      throw error;
    }
  }
  async Update(id: string, @Req() request: FastifyRequest) {
    let data: any = {};
    let newfilename: string | null = null;
    if (request.isMultipart()) {
      const parts = request.parts();
      if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads', { recursive: true });
      }
      for await (const part of parts) {
        if (part.type === 'field') {
          data[part.fieldname] = part.value;
        } else if (part.type === 'file') {
          const ext = path.extname(part.filename);
          newfilename = Date.now() + ext;
          const filepath = path.join(process.cwd(), 'uploads', newfilename);
          await fs.promises.writeFile(filepath, await part.toBuffer());
        }
      }
    } else {
      data = request.body || {};
    }
    const oldSupplier = await this.prisma.supplier.findUnique({
      where: { uuid: id },
    });
    if (!oldSupplier) throw new NotFoundException('Supplier not found');
    if (
      newfilename &&
      oldSupplier.Thumnail &&
      oldSupplier.Thumnail.trim().toLowerCase() !== 'default.png'
    ) {
      const oldimage = oldSupplier.Thumnail.trim().toLowerCase();
      if (oldimage && oldimage !== 'default.png') {
        const filepath = path.join(
          process.cwd(),
          'uploads',
          oldSupplier.Thumnail,
        );
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    }
    const isActive =
      data.IsActive === 'true' ||
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
  async Delete(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { uuid: id },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');
    const purchaseCount = await this.prisma.purchase.count({
      where: { SupplierID: supplier.SupplierID },
    });
    if (purchaseCount > 0) {
      throw new BadRequestException('Cannot delete a supplier with associated purchases');
    }
    if (
      supplier.Thumnail &&
      supplier.Thumnail.trim().toLowerCase() !== 'default.png'
    ) {
      const filepath = path.join(process.cwd(), 'uploads', supplier.Thumnail);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }
    await this.prisma.supplier.delete({
      where: { uuid: id },
    });
    return { message: 'Supplier deleted successfully' };
  }
}
