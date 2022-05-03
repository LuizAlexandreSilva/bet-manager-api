import { Controller, Get, Request } from '@nestjs/common';
import { MarketsService } from './markets.service';

@Controller('markets')
export class MarketsController {
  constructor(private service: MarketsService) {}

  @Get('/')
  async getUserMarkets(@Request() req) {
    const { userId } = req.query;
    return this.service.getMarketsByUser(userId);
  }
}
