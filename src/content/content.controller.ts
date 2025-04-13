import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentType } from '@prisma/client';
import { CreateContentValidation } from './validations/content.validation';
import { UpdateContentValidation } from './validations/content.validation';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createContentValidation: CreateContentValidation) {
    return this.contentService.create(createContentValidation);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get('trending')
  getTrending() {
    return this.contentService.getTrending();
  }

  @Get('new-releases')
  getNewReleases() {
    return this.contentService.getNewReleases();
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.contentService.search(query);
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.contentService.findByCategory(id);
  }

  @Get('type/:type')
  findByType(@Param('type') type: ContentType) {
    return this.contentService.findByType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateContentValidation: UpdateContentValidation,
  ) {
    return this.contentService.update(id, updateContentValidation);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
