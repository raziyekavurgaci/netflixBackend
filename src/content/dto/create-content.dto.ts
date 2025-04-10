import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ContentType } from '@prisma/client';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ContentType)
  @IsNotEmpty()
  type: ContentType;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
