import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWatchlistValidation {
  @IsString()
  @IsNotEmpty()
  contentId: string;
}
