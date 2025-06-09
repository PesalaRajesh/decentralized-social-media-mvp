// src/posts/posts.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('posts')
export class PostsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getAllPosts() {
    return this.prisma.post.findMany({ orderBy: { timestamp: 'desc' } });
  }

  @Post()
  createPost(@Body() body: { wallet_address: string; content: string }) {
    return this.prisma.post.create({ data: body });
  }

  @Post(':id/like')
  async likePost(@Param('id') postId: string, @Body('wallet_address') wallet_address: string) {
    return this.prisma.like.create({ data: { post_id: +postId, wallet_address } });
  }

  @Post(':id/comment')
  async commentPost(@Param('id') postId: string, @Body() body: { wallet_address: string; content: string }) {
    return this.prisma.comment.create({ data: { post_id: +postId, wallet_address: body.wallet_address, content: body.content } });
  }

  @Get(':id')
  async getPostDetails(@Param('id') postId: string) {
    return this.prisma.post.findUnique({
      where: { id: +postId },
      include: {
        comments: true,
        likes: true,
      },
    });
  }
}