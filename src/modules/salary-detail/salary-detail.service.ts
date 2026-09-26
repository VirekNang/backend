import { Injectable } from '@nestjs/common';

import { SalaryDetailDto } from './dto/SalaryDetail.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class SalaryDetailService {
    constructor(private readonly prisma:PrismaService){}
    Get(){
        return this.prisma.salaryDetail.findMany();
    }
    GetById(id: string){
        return this.prisma.salaryDetail.findUnique({
            where: { uuid: id },
            include:{Employee:true}
        })
    }
    Create(data:SalaryDetailDto){
        return this.prisma.salaryDetail.create({
            data: {
                EmployeeID: data.EmployeeID,
                Bonus: data.Bonus,
                Month: data.Month,
                Year: data.Year,
                SalaryOfMonth: data.SalaryOfMonth ?? 0,
                TotalSalary: data.TotalSalary ?? 0,
                Note: data.Note ?? '',
            }
        })
    }
    Update(id: string,data:SalaryDetailDto){
        return this.prisma.salaryDetail.update({
            where: { uuid: id },
            data: {
                EmployeeID: data.EmployeeID,
                Bonus: data.Bonus,
                Month: data.Month,
                Year: data.Year,
                SalaryOfMonth: data.SalaryOfMonth !== undefined ? data.SalaryOfMonth : undefined,
                TotalSalary: data.TotalSalary !== undefined ? data.TotalSalary : undefined,
                Note: data.Note,
            }
        })
    }
    Delete(id: string){
        return this.prisma.salaryDetail.delete({
            where: { uuid: id }
        })
    }
}
