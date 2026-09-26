import { Controller, Get, Post, Put, Param, Req,Delete } from '@nestjs/common';

import type {FastifyRequest} from 'fastify';
import { ApiConsumes,ApiBody } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService:EmployeeService){}
    @Get()
    GetAll(){
        return this.employeeService.Get();
    }
    @Get(':id')
    GetById(@Param('id') id: string ){
        return this.employeeService.GetById(id);
    }
    
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                EmployeeName:{type:'string'},
               // EmployeeNo:{type:'string'},
                Gender:{type:'string'},
                DateOfBirth:{type:'string', format:'date'},
                Indentity:{type:'number'},
                Phone:{type:'string'},
                EducationStatus:{type:'string'},
                Address:{type:'string'},
                Department:{type:'string'},
                Position:{type:'string'},
                HiredDate:{type:'string', format:'date'},
                BaseSalary:{type:'number'},
                PhotoURL:{type:'string',format:'binary'},
                IsActive:{type:'boolean'}

            }
        }
    })
    Create(@Req() request:FastifyRequest){
        return this.employeeService.Create(request);
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                EmployeeName:{type:'string'},
                Gender:{type:'string'},
                DateOfBirth:{type:'string', format:'date'},
                Indentity:{type:'number'},
                Phone:{type:'string'},
                EducationStatus:{type:'string'},
                Address:{type:'string'},
                Department:{type:'string'},
                Position:{type:'string'},
                HiredDate:{type:'string', format:'date'},
                BaseSalary:{type:'number'},
                PhotoURL:{type:'string',format:'binary'},
                IsActive:{type:'boolean'}
            }
        }
    })
    Update(@Param('id') id: string, @Req() request: FastifyRequest) {
        return this.employeeService.Update(id, request);
    }
    @Delete(':id')
    Delete(@Param('id') id: string) {
        return this.employeeService.Delete(id);
    }
    
}
