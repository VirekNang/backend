import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Get,Post,Put,Delete } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('')
    async GetAll(){
        return this.customerService.GetAll();
    }
    @Get(':id')
    async GetById(@Param('id') id: string){
        return this.customerService.GetById(id);
    }
    @Post('')
    async Create(@Body() customer:CustomerDto){
        return this.customerService.Create(customer);
    }
    @Put(':id')
    async Update(@Param('id') id: string,@Body() customer:CustomerDto){
        return this.customerService.Update(id,customer);
    }
    @Delete(':id')
    async Delete(@Param('id') id: string){
        return this.customerService.Delete(id);
    }
}
