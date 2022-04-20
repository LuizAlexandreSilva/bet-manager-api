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
  async listBets(@Request() req) {
    const { bankrollId } = req.params;
    return this.service.listBets(bankrollId);
  }
}
