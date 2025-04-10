import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { PaymentStatus } from '@prisma/client';

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: RequestWithUser,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.create(req.user.id, createPaymentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: RequestWithUser) {
    return this.paymentService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.paymentService.findOne(id, req.user.id);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body('status') status: PaymentStatus) {
    return this.paymentService.updateStatus(id, status);
  }
}
