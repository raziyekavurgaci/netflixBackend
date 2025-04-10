import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPaymentDto: CreatePaymentDto) {
    const { subscriptionId, amount } = createPaymentDto;

    if (subscriptionId) {
      const subscription = await this.prisma.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription) {
        throw new NotFoundException('Subscription not found');
      }

      if (subscription.userId !== userId) {
        throw new NotFoundException('Subscription not found');
      }
    }

    return this.prisma.payment.create({
      data: {
        user: { connect: { id: userId } },
        amount,
        status: PaymentStatus.PENDING,
        ...(subscriptionId && {
          subscription: { connect: { id: subscriptionId } },
        }),
      },
      include: {
        user: true,
        subscription: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      include: {
        user: true,
        subscription: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: true,
        subscription: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.userId !== userId) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async updateStatus(id: string, status: PaymentStatus) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return this.prisma.payment.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        subscription: true,
      },
    });
  }
}
