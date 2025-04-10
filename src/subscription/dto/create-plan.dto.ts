import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number; // Ay cinsinden süre

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  features: string[];
}
