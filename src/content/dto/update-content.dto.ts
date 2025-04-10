import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ContentType } from '@prisma/client';

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ContentType)
  @IsOptional()
  type?: ContentType;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
