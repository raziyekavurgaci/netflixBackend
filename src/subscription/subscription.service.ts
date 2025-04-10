import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  // Plan işlemleri
  async createPlan(createPlanDto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: createPlanDto,
    });
  }

  async findAllPlans() {
    return this.prisma.plan.findMany();
  }

  async findOnePlan(id: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    return plan;
  }

  // Abonelik işlemleri
  async createSubscription(
    userId: string,
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: createSubscriptionDto.planId },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    return this.prisma.subscription.create({
      data: {
        user: { connect: { id: userId } },
        plan: { connect: { id: plan.id } },
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE,
      },
      include: {
        user: true,
        plan: true,
      },
    });
  }

  async findAllSubscriptions(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
      include: {
        user: true,
        plan: true,
      },
    });
  }

  async findOneSubscription(id: string, userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
      include: {
        user: true,
        plan: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (subscription.userId !== userId) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async cancelSubscription(id: string, userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (subscription.userId !== userId) {
      throw new NotFoundException('Subscription not found');
    }

    return this.prisma.subscription.update({
      where: { id },
      data: {
        status: SubscriptionStatus.CANCELLED,
      },
      include: {
        user: true,
        plan: true,
      },
    });
  }

  async checkSubscriptionStatus(userId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
        endDate: {
          gt: new Date(),
        },
      },
      include: {
        plan: true,
      },
    });

    return subscription;
  }
}
