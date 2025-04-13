import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ContentType } from '@prisma/client';

export class CreateContentValidation {
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

export class UpdateContentValidation {
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
