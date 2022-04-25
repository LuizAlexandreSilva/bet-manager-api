import { Controller, Get, Post, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private service: TransactionsService) {}

  @Post('bet')
  async createBet(@Request() req) {
    return this.service.createBet(req.body);
  }

  @Get('bets')
  async listBetsByPeriod(@Request() req) {
    const { startDate, endDate } = req.query;
    return this.service.listBetsByPeriod(startDate, endDate);
  }

  @Get('bets/pending')
  async listPendingBets(@Request() req) {
    const { bankrollId } = req.query;
    return this.service.listPendingBets(bankrollId);
  }
}
