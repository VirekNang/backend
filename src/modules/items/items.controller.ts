import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
//import { Public } from 'src/auth/decorator/public.decorator';
import type { FastifyRequest } from 'fastify';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}

   
    @Get()
    GetAll() {
        return this.itemService.Get();
    }

    @Get('best-sellers')
    GetBestSellers(
        @Query('days') days?: string,
        @Query('limit') limit?: string,
    ) {
        return this.itemService.GetBestSellers(Number(days), Number(limit));
    }

   
    @Get(':id')
    GetById(@Param('id', ParseIntPipe) id: number) {
        return this.itemService.GetByid(id);
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                ItemName: { type: 'string' },
                CategoryID: { type: 'number' },
                BrandID: { type: 'number' },
                UnitPrice: { type: 'number' },
                SalePrice: { type: 'number' },
                StockQuantity: { type: 'number' },
                Description: { type: 'string' },
                Image: { type: 'string', format: 'binary' },
                Barcode: { type: 'string' },
                UnitOfMeasure: { type: 'string' },
                IsActive: { type: 'boolean' },
            },
        },
    })
    Create(@Req() request: FastifyRequest) {
        return this.itemService.Create(request);
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                ItemName: { type: 'string' },
                CategoryID: { type: 'number' },
                BrandID: { type: 'number' },
                UnitPrice: { type: 'number' },
                SalePrice: { type: 'number' },
                StockQuantity: { type: 'number' },
                Description: { type: 'string' },
                Image: { type: 'string', format: 'binary' },
                Barcode: { type: 'string' },
                UnitOfMeasure: { type: 'string' },
                IsActive: { type: 'boolean' },
            },
        },
    })
    Update(@Param('id', ParseIntPipe) id: number, @Req() request: FastifyRequest) {
        return this.itemService.Update(id, request);
    }

    @Delete(':id')
    Delete(@Param('id', ParseIntPipe) id: number) {
        return this.itemService.Delete(id);
    }
}
