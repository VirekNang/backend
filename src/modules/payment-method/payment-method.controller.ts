import { Controller,Get,Post,Put,Delete,Param,Req } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';

import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';

@Controller('payment-method')
export class PaymentMethodController {
    constructor(private readonly paymentMethodService:PaymentMethodService){}
    @Get()
   
    Get(){
        return this.paymentMethodService.Get();
    }
    @Get(':id')

    GetById(@Param('id') id: string){
        return this.paymentMethodService.GetById(id);
    }
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                PaymentMethodName: { type: 'string' },
                PaymentMethodDescription: { type: 'string' },
                PaymentMethodImage: { type: 'string', format: 'binary' },
                IsActive: { type: 'boolean' },
            }
        }
    })
    Create(@Req() request:FastifyRequest){
        return this.paymentMethodService.Create(request);
    }
    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                PaymentMethodName: { type: 'string' },
                PaymentMethodDescription: { type: 'string' },
                PaymentMethodImage: { type: 'string', format: 'binary' },
                IsActive: { type: 'boolean' },
            }
        }
    })
    Update(@Param('id') id: string,@Req() request:FastifyRequest){
        return this.paymentMethodService.Update(id,request);
    }
    @Delete(':id')
    Delete(@Param('id') id: string){
        return this.paymentMethodService.Delete(id);
    }
}
