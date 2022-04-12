import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async create(user: User) {
    const userExists = await this.findByEmail(user.email);
    if (!userExists) throw new Error('E-mail em uso.');

    const hashedPassword = await hash(user.password, 8);
    const newUser = {
      ...user,
      password: hashedPassword,
    };

    return this.prisma.users.create(newUser);
  }
}
