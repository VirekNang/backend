import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClosingCashService } from './closing-cash.service';

@Controller('closing-cash')
export class ClosingCashController {
    constructor(private readonly closingCashService: ClosingCashService) {}

    @Get()
    getAll() {
        return this.closingCashService.Get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.closingCashService.GetById(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.closingCashService.Create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.closingCashService.Update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.closingCashService.Delete(id);
    }
}
