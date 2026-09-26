import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @Get()
    getAll() {
        return this.purchaseService.Get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.purchaseService.GetById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.purchaseService.Create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.purchaseService.Update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.purchaseService.Delete(id);
    }
}
