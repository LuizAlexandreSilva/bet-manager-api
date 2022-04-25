import { Injectable } from '@nestjs/common';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { PrismaService } from 'src/prisma.service';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createBet(transaction: Partial<Transaction>) {
    return await this.prisma.transactions.create({
      data: {
        eventName: transaction.eventName,
        date: transaction.date,
        type: transaction.type,
        note: transaction.note,
        odd: transaction.odd,
        stake: transaction.stake,
        status: transaction.status,
        Sport: {
          connect: {
            id: transaction.sportId,
          },
        },
        Bankroll: {
          connect: {
            id: transaction.bankrollId,
          },
        },
        Competition: transaction.competitionId && {
          connect: {
            id: transaction.competitionId,
          },
        },
        Market: transaction.marketId && {
          connect: {
            id: transaction.marketId,
          },
        },
        MultipleSelections:
          transaction.MultipleSelections?.length > 0
            ? {
                createMany: {
                  data: transaction.MultipleSelections,
                },
              }
            : undefined,
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
        Competition: true,
        Market: true,
        MultipleSelections: true,
        Bankroll: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async listPendingBets(bankrollId: string) {
    return this.prisma.transactions.findMany({
      where: {
        bankrollId,
        type: {
          in: [TransactionType.STANDARD_BET, TransactionType.MULTIPLE_BET],
        },
        status: TransactionStatus.PENDING,
      },
      include: {
        Competition: true,
        Market: true,
        MultipleSelections: true,
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
