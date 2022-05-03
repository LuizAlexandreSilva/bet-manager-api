import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategoriesByUser(userId: string) {
    return this.prisma.categories.findMany({
      where: {
        OR: [{ userId }, { userId: null }],
      },
    });
  }
}
