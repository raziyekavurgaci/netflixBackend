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
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistValidation } from './validations/watchlist.validation';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../auth/types/user.type';

@Controller('watchlist')
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createWatchlistValidation: CreateWatchlistValidation,
  ) {
    const user = req.user as User;
    return this.watchlistService.create(user.id, createWatchlistValidation);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.watchlistService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as User;
    return this.watchlistService.findOne(id, user.id);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as User;
    return this.watchlistService.remove(id, user.id);
  }
}
