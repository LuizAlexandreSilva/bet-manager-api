import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MarketsService {
  constructor(private prisma: PrismaService) {}

  async getMarketsByUser(userId: string) {
    return this.prisma.markets.findMany({
      where: {
        OR: [{ userId }, { userId: null }],
      },
    });
  }
}
