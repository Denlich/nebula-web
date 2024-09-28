import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...data,
        cart: {
          create: {},
        },
      },
      include: {
        cart: true,
      },
    });
  }

  async find(where: Prisma.UserWhereInput): Promise<User> {
    return this.prismaService.user.findFirst({
      where,
      include: {
        cart: true,
      },
    });
  }

  findById(id: string) {
    return this.prismaService.user.findFirst({
      where: { id },
      include: {
        cart: true,
      },
    });
  }
}
