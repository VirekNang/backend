import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CustomerDto } from './dto/customer.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) { }
    GetAll(){
        return this.prisma.customer.findMany({
            
        });
    }
    async GetById(id: string){
        return this.prisma.customer.findUnique({
            where :{
                uuid: id,
            },
            include :{membership:true,}
        });
    }
    async Create(customer:CustomerDto){
  
        const lastCustomer = await this.prisma.customer.findFirst({
            orderBy: {
                CustomerID: 'desc',
            },
        });
        
        let nextNumber = 1;
        if (lastCustomer && lastCustomer.CustomerNo && lastCustomer.CustomerNo.startsWith('CUT-')) {
           
            const lastNumberStr = lastCustomer.CustomerNo.replace('CUT-', '');
            const lastNumber = parseInt(lastNumberStr, 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }
        
        const newCustomerNo = `CUT-${nextNumber}`;
        
        const data = {
            ...customer,
            CustomerNo: newCustomerNo,
        };

        return this.prisma.customer.create({
            data: data as Prisma.CustomerUncheckedCreateInput
        });
    }
    async Update(id: string, customer: CustomerDto){
        const existing = await this.prisma.customer.findUnique({ where: { uuid: id } });
        if (!existing) throw new NotFoundException('Customer not found');
        return this.prisma.customer.update({
            where :{
                uuid: id,
            },
            data: customer 
        });
    }
    async Delete(id: string) {
        const existing = await this.prisma.customer.findUnique({ where: { uuid: id } });
        if (!existing) throw new NotFoundException('Customer not found');
        if (await this.prisma.sale.count({ where: { CustomerID: existing.CustomerID } })) {
          throw new BadRequestException('Cannot delete customer with existing sales');
        }
        return this.prisma.customer.delete({ where: { uuid: id } });
    }
}
