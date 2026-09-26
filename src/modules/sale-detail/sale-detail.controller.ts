import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';

@Controller('sale-detail')
export class SaleDetailController {
    constructor(private readonly saleDetailService: SaleDetailService) {}

    @Get()
    getAll() {
        return this.saleDetailService.Get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.saleDetailService.GetById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.saleDetailService.Create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.saleDetailService.Update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.saleDetailService.Delete(id);
    }
}
