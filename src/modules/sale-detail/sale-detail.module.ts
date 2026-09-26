import { Module } from '@nestjs/common';
import { SaleDetailController } from './sale-detail.controller';
import { SaleDetailService } from './sale-detail.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [SaleDetailController],
  providers: [SaleDetailService]
})
export class SaleDetailModule {}
