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
import { CreatePlanValidation } from './validations/subscription.validation';
import { CreateSubscriptionValidation } from './validations/subscription.validation';
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
  createPlan(@Body() createPlanValidation: CreatePlanValidation) {
    return this.subscriptionService.createPlan(createPlanValidation);
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
    @Body() createSubscriptionValidation: CreateSubscriptionValidation,
  ) {
    return this.subscriptionService.createSubscription(
      req.user.id,
      createSubscriptionValidation,
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
