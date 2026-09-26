import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { OpeningCashService } from './opening-cash.service';

@Controller('opening-cash')
export class OpeningCashController {
    constructor(private readonly openingCashService: OpeningCashService) {}

    @Get()
    getAll() {
        return this.openingCashService.Get();
    }

    @Get('active')
    getActive(@Query('employeeId') employeeId: string) {
        return this.openingCashService.GetActiveByEmployee(parseInt(employeeId, 10));
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.openingCashService.GetById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.openingCashService.Create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.openingCashService.Update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.openingCashService.Delete(id);
    }
}
