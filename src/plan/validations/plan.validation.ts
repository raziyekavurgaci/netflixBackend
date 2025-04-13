import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreatePlanValidation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  features: string[];
}
