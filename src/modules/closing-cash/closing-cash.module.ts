import { Module } from '@nestjs/common';
import { ClosingCashController } from './closing-cash.controller';
import { ClosingCashService } from './closing-cash.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClosingCashController],
  providers: [ClosingCashService],
})
export class ClosingCashModule {}
