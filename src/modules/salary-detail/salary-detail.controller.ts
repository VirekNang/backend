import { Controller,Post,Put,Delete,Get,Param,Body } from '@nestjs/common';
import { SalaryDetailService } from './salary-detail.service';
import { SalaryDetailDto } from './dto/SalaryDetail.dto';

@Controller('salary-detail')
export class SalaryDetailController {
    constructor(private readonly salaryDetailService:SalaryDetailService){}
    @Get()
    GetAll(){
        return this.salaryDetailService.Get();
    }
    @Get(':id')
    GetById(@Param('id') id: string){
        return this.salaryDetailService.GetById(id);
    }
    @Post()
    
    Create(@Body() data:SalaryDetailDto){
        return this.salaryDetailService.Create(data);
    }
    @Put(':id')
    Update(@Param('id') id: string,@Body() data:SalaryDetailDto){
        return this.salaryDetailService.Update(id,data);
    }
    @Delete(':id')
    Delete(@Param('id') id: string){
        return this.salaryDetailService.Delete(id);
    }

}
