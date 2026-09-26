import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import '@fastify/multipart';
import type { FastifyRequest } from 'fastify';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  GetAll() { return this.prisma.brand.findMany(); }

  GetById(id: string) { return this.prisma.brand.findUnique({ where: { uuid: id } }); }

  async Create(request: FastifyRequest) {
    const { data, imageName } = await this.readRequest(request);
    if (!data.BrandName) {
      await this.removeImage(imageName);
      throw new BadRequestException('BrandName is required');
    }
    try {
      const brand = await this.prisma.brand.create({ data: {
        BrandName: data.BrandName,
        Description: data.Description ?? data.description ?? null,
        IsActive: this.toBoolean(data.IsActive, true),
        Image: imageName,
      } });
      return { message: 'Brand created successfully', data: brand };
    } catch (error) {
      await this.removeImage(imageName);
      throw error;
    }
  }

  async Update(id: string, request: FastifyRequest) {
    const { data, imageName } = await this.readRequest(request);
    const existing = await this.GetById(id);
    if (!existing) throw new NotFoundException('Brand not found');
    try {
      const brand = await this.prisma.brand.update({ where: { uuid: id }, data: {
        BrandName: data.BrandName ?? existing.BrandName,
        Description: data.Description ?? data.description ?? existing.Description,
        IsActive: data.IsActive === undefined ? existing.IsActive : this.toBoolean(data.IsActive),
        Image: imageName ?? existing.Image,
      } });
      if (imageName && existing.Image) await this.removeImage(existing.Image);
      return { message: 'Brand updated successfully', data: brand };
    } catch (error) {
      await this.removeImage(imageName);
      throw error;
    }
  }

  async Delete(id: string) {
    const existing = await this.GetById(id);
    if (!existing) throw new NotFoundException('Brand not found');
    if (await this.prisma.item.count({ where: { BrandID: existing.BrandID } })) {
      throw new BadRequestException('Cannot delete a brand with associated items');
    }
    await this.prisma.brand.delete({ where: { uuid: id } });
    await this.removeImage(existing.Image);
    return { message: 'Brand deleted successfully' };
  }

  private async readRequest(request: FastifyRequest): Promise<{ data: Record<string, any>; imageName: string | null }> {
    const data: Record<string, any> = {};
    let imageName: string | null = null;
    if (!request.isMultipart()) return { data: (request.body as Record<string, any>) ?? {}, imageName };

    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    for await (const part of request.parts()) {
      if (part.type === 'field') { data[part.fieldname] = part.value; continue; }
      const extension = path.extname(part.filename || '');
      imageName = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`;
      await fs.writeFile(path.join(uploadsDir, imageName), await part.toBuffer());
    }
    return { data, imageName };
  }

  private toBoolean(value: unknown, defaultValue = false): boolean {
    if (value === undefined || value === null || value === '') return defaultValue;
    return value === true || value === 'true';
  }

  private async removeImage(imageName: string | null | undefined): Promise<void> {
    if (!imageName || imageName.trim().toLowerCase() === 'default.png') return;
    try { await fs.unlink(path.join(process.cwd(), 'uploads', imageName)); }
    catch (error: any) { if (error.code !== 'ENOENT') throw error; }
  }
}
