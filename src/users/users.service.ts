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
    return this.prismaService.user.create({ data })
  }

  async update(payload: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(payload)
  }
}
