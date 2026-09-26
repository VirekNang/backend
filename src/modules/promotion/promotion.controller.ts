import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}

    @Get()
    getAll() {
        return this.promotionService.Get();
    }

    @Get('active')
    getActive() {
        return this.promotionService.GetActive();
    }

    @Get('promo-code/:code')
    getByPromoCode(@Param('code') code: string) {
        return this.promotionService.GetByPromoCode(code);
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.promotionService.GetById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.promotionService.Create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.promotionService.Update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.promotionService.Delete(id);
    }
}
