import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateInterestDto {
	@IsNotEmpty()
  @IsString()
  @MaxLength(255)
  interest: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  route: string;

  @IsNotEmpty()
  @IsInt()
  status: number;
}