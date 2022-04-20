import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
  private PAGE_SIZE = 20;

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

  async listBets(bankrollId: string, page = 1) {
    return this.prisma.transactions.findMany({
      skip: (page - 1) * this.PAGE_SIZE,
      take: this.PAGE_SIZE,
      where: {
        bankrollId,
        type: {
          in: [TransactionType.STANDARD_BET, TransactionType.MULTIPLE_BET],
        },
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
}
