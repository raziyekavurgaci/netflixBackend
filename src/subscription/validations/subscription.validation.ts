import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionValidation {
  @IsString()
  @IsNotEmpty()
  planId: string;
}
