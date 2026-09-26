import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  getAll() { return this.brandService.GetAll(); }

  @Get(':id')
  getById(@Param('id') id: string) { return this.brandService.GetById(id); }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', required: ['BrandName'], properties: {
    BrandName: { type: 'string' }, Description: { type: 'string' },
    IsActive: { type: 'boolean', default: true }, Image: { type: 'string', format: 'binary' },
  } } })
  create(@Req() request: FastifyRequest) { return this.brandService.Create(request); }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: {
    BrandName: { type: 'string' }, Description: { type: 'string' },
    IsActive: { type: 'boolean' }, Image: { type: 'string', format: 'binary' },
  } } })
  update(@Param('id') id: string, @Req() request: FastifyRequest) {
    return this.brandService.Update(id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.brandService.Delete(id); }
}
