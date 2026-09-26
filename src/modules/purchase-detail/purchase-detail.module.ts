import { Module } from '@nestjs/common';
import { PurchaseDetailController } from './purchase-detail.controller';
import { PurchaseDetailService } from './purchase-detail.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseDetailController],
  providers: [PurchaseDetailService],
})
export class PurchaseDetailModule {}
