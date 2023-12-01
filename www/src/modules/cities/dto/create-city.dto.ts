import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCityDto {
	@IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nameCity: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  route: string;

  @IsNotEmpty()
  @IsInt()
  status: number;
}