import { Injectable } from '@nestjs/common';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { PrismaService } from 'src/prisma.service';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  private getBetResult(transaction: Partial<Transaction>): number {
    switch (transaction.status) {
      case TransactionStatus.PENDING:
        return null;
      case TransactionStatus.LOSS:
        return transaction.stake * -1;
      case TransactionStatus.WON:
        return transaction.stake & transaction.odd;
      case TransactionStatus.DRAW:
        return transaction.stake;
      default:
        return null;
    }
  }

  async createBet(transaction: Partial<Transaction>) {
    return await this.prisma.transactions.create({
      data: {
        eventName: transaction.eventName,
        date: transaction.date,
        type: transaction.type,
        note: transaction.note,
        odd: transaction.odd,
        stake: transaction.stake,
        result: this.getBetResult(transaction),
        status: transaction.status,
        Category: transaction.categoryId && {
          connect: {
            id: transaction.categoryId,
          },
        },
        Market: transaction.marketId && {
          connect: {
            id: transaction.marketId,
          },
        },
      },
    });
  }

  async listBetsByPeriod(startDate: string, endDate: string) {
    return this.prisma.transactions.findMany({
      where: {
        type: {
          in: [TransactionType.STANDARD_BET, TransactionType.MULTIPLE_BET],
        },
        status: {
          notIn: [TransactionStatus.PENDING],
        },
        date: {
          gte: this.getDateAtUTC(startDate, startOfDay),
          lte: this.getDateAtUTC(endDate, endOfDay),
        },
      },
      include: {
        Market: true,
        Category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async listPendingBets() {
    return this.prisma.transactions.findMany({
      where: {
        type: {
          in: [TransactionType.STANDARD_BET, TransactionType.MULTIPLE_BET],
        },
        status: TransactionStatus.PENDING,
      },
      include: {
        Market: true,
        Category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  private getDateAtUTC(date: string, func: (date: Date) => Date) {
    const loc = 'UTC';
    return zonedTimeToUtc(func(new Date(date)), loc);
  }
}
