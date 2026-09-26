import { Module } from '@nestjs/common';
import { OpeningCashController } from './opening-cash.controller';
import { OpeningCashService } from './opening-cash.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OpeningCashController],
  providers: [OpeningCashService],
})
export class OpeningCashModule {}
