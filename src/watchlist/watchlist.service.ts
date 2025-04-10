import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createWatchlistDto: CreateWatchlistDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.prisma.watchlist.create({
      data: {
        user: { connect: { id: userId } },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        content: { connect: { id: createWatchlistDto.contentId } },
      },
      include: {
        user: true,
        content: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.watchlist.findMany({
      where: { userId },
      include: {
        user: true,
        content: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const watchlist = await this.prisma.watchlist.findUnique({
      where: { id },
      include: {
        user: true,
        content: true,
      },
    });

    if (!watchlist) {
      throw new NotFoundException('Watchlist item not found');
    }

    if (watchlist.userId !== userId) {
      throw new NotFoundException('Watchlist item not found');
    }

    return watchlist;
  }

  async remove(id: string, userId: string) {
    const watchlist = await this.prisma.watchlist.findUnique({
      where: { id },
    });

    if (!watchlist) {
      throw new NotFoundException('Watchlist item not found');
    }

    if (watchlist.userId !== userId) {
      throw new NotFoundException('Watchlist item not found');
    }

    return this.prisma.watchlist.delete({
      where: { id },
      include: {
        user: true,
        content: true,
      },
    });
  }
}
