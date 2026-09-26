import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';

import type { FastifyRequest } from 'fastify';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    
  
    @Get()    
    Getall() {
        return this.categoriesService.Get();
    }
    
  
    @Get(':id')
    Getbyid(@Param('id') id: string) {
        return this.categoriesService.GetbyId(id);
    }

    @Post()
     @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                CategoryName:{type:'string'},
                description:{type:'string'},
                IsActive:{type:'boolean'},
                Thumnail:{type:'string',format:'binary'}
            }

        }})
    Create(@Req() request: FastifyRequest) {
        return this.categoriesService.Create(request);
    }

    @Put(':id')
     @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                CategoryName:{type:'string'},
                description:{type:'string'},
                IsActive:{type:'boolean'},
                Thumnail:{type:'string',format:'binary'}
            }

        }})
    Update(@Param('id') id: string, @Req() request: FastifyRequest) {
        return this.categoriesService.Update(id, request);
    }

    @Delete(':id')
    Delete(@Param('id') id: string) {
        return this.categoriesService.Delete(id);
    }
}
