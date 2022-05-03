import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';

@Module({
  controllers: [MarketsController],
  providers: [MarketsService, PrismaService],
})
export class MarketsModule {}
