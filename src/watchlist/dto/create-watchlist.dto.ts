import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWatchlistDto {
  @IsString()
  @IsNotEmpty()
  contentId: string;
}
