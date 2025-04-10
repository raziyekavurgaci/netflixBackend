import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('plan')
  createPlan(@Body() createPlanDto: CreatePlanDto) {
    return this.subscriptionService.createPlan(createPlanDto);
  }

  @Get('plan')
  findAllPlans() {
    return this.subscriptionService.findAllPlans();
  }

  @Get('plan/:id')
  findOnePlan(@Param('id') id: string) {
    return this.subscriptionService.findOnePlan(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createSubscription(
    @Req() req: RequestWithUser,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.createSubscription(
      req.user.id,
      createSubscriptionDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllSubscriptions(@Req() req: RequestWithUser) {
    return this.subscriptionService.findAllSubscriptions(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneSubscription(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.subscriptionService.findOneSubscription(id, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  cancelSubscription(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.subscriptionService.cancelSubscription(id, req.user.id);
  }
}
