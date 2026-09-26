import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Get()
    getAll(@Query('category') category?: string) {
        if (category) return this.expenseService.GetByCategory(category);
        return this.expenseService.Get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.expenseService.GetById(id);
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                Title: { type: 'string' },
                Amount: { type: 'number' },
                Category: { type: 'string' },
                Description: { type: 'string' },
                EmployeeID: { type: 'number' },
                ExpenseDate: { type: 'string', format: 'date-time' },
                Image: { type: 'string', format: 'binary' },
            },
            required: ['Title', 'Amount'],
        },
    })
    create(@Req() request: FastifyRequest) {
        return this.expenseService.Create(request);
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                Title: { type: 'string' },
                Amount: { type: 'number' },
                Category: { type: 'string' },
                Description: { type: 'string' },
                EmployeeID: { type: 'number' },
                ExpenseDate: { type: 'string', format: 'date-time' },
                Image: { type: 'string', format: 'binary' },
            },
        },
    })
    update(@Param('id', ParseIntPipe) id: number, @Req() request: FastifyRequest) {
        return this.expenseService.Update(id, request);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.expenseService.Delete(id);
    }
}
