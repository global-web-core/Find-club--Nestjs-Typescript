import { IsInt, IsNotEmpty } from "class-validator";

export class CreateInterestByCityDto {
	@IsNotEmpty()
  @IsInt()
  idInterest: number;

  @IsNotEmpty()
  @IsInt()
  idCity: number;

  @IsNotEmpty()
  @IsInt()
  amountActivity: number;

  @IsNotEmpty()
  @IsInt()
  status: number;
}