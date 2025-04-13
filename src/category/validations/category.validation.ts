import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryValidation {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryValidation {
  @IsString()
  @IsOptional()
  name?: string;
}
