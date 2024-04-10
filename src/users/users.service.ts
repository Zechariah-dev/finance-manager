import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.$transaction(async (trx) => {
      const user = await trx.user.create({ data });

      await trx.account.create({
        data: { balance: 0, userId: user.id },
      });

      return user;
    });
  }

  async update(payload: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(payload);
  }
}
