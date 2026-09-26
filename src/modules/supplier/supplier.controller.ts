import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService:SupplierService) {}
    @Get()
    GetAll(){
        return this.supplierService.GetAll();
    }
    @Get(':id')
    GetById(@Param('id') id: string){
        return this.supplierService.GetById(id);
    }
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                SupplierName:{type:'string'},
                Phone:{type:'string'},
                Address:{type:'string'},
                Description:{type:'string'},
                Thumnail:{type:'string',format:'binary'},
                IsActive:{type:'boolean'}
            }
        }
    })
    Create(@Req() request:FastifyRequest){
        return this.supplierService.Create(request);
    }
    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                SupplierName:{type:'string'},
                Phone:{type:'string'},
                Address:{type:'string'},
                Description:{type:'string'},
                Thumnail:{type:'string',format:'binary'},
                IsActive:{type:'boolean'}
            }
        }
    })
    Update(@Param('id') id: string, @Req() request:FastifyRequest){
        return this.supplierService.Update(id, request);
    }
    @Delete(':id')
    Delete(@Param('id') id: string){
        return this.supplierService.Delete(id);
    }


}
