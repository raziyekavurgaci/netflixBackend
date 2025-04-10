import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContentType } from '@prisma/client';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    return this.prisma.content.create({
      data: createContentDto,
      include: {
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.content.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return content;
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    const content = await this.prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return this.prisma.content.update({
      where: { id },
      data: updateContentDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return this.prisma.content.delete({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async findByCategory(categoryId: string) {
    return this.prisma.content.findMany({
      where: { categoryId },
      include: {
        category: true,
      },
    });
  }

  async findByType(type: ContentType) {
    return this.prisma.content.findMany({
      where: { type },
      include: {
        category: true,
      },
    });
  }

  async search(query: string) {
    return this.prisma.content.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        category: true,
      },
    });
  }

  async getTrending() {
    // Burada daha sonra izlenme sayısı, beğeni gibi metrikler eklenebilir
    return this.prisma.content.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
  }

  async getNewReleases() {
    return this.prisma.content.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
  }
}
