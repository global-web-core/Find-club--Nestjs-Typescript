import { IsString, MaxLength, IsDateString, IsNotEmpty } from "class-validator";

export class CreateVerificationtokenDto {
	@IsNotEmpty()
	@IsString()
  @MaxLength(255)
  identifier: string;

	@IsNotEmpty()
  @IsString()
  @MaxLength(255)
  token: string;

	@IsNotEmpty()
  @IsDateString()
  expires: Date;
}
