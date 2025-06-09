// src/users/users.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get(':wallet')
  async getUser(@Param('wallet') wallet: string) {
    return this.prisma.user.findUnique({ where: { wallet_address: wallet } });
  }

  @Post()
  async upsertUser(@Body() body: { wallet_address: string; username?: string; bio?: string; profile_pic_url?: string }) {
    return this.prisma.user.upsert({
      where: { wallet_address: body.wallet_address },
      update: body,
      create: body,
    });
  }
}