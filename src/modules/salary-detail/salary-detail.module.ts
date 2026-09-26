import { Module } from '@nestjs/common';
import { SalaryDetailController } from './salary-detail.controller';
import { SalaryDetailService } from './salary-detail.service';
import { PrismaModule } from '../../prisma/prisma.module';


@Module({
  imports:[PrismaModule],
  controllers: [SalaryDetailController],
  providers: [SalaryDetailService]
})
export class SalaryDetailModule {}
