import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PurchaseDetailService } from './purchase-detail.service';

@Controller('purchase-detail')
export class PurchaseDetailController {
    constructor(private readonly purchaseDetailService: PurchaseDetailService) {}

    @Get()
    getAll(@Query('purchaseId') purchaseId?: string) {
        if (purchaseId) {
            return this.purchaseDetailService.GetByPurchase(parseInt(purchaseId, 10));
        }
        return this.purchaseDetailService.Get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.purchaseDetailService.GetById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.purchaseDetailService.Create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.purchaseDetailService.Update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.purchaseDetailService.Delete(id);
    }
}
