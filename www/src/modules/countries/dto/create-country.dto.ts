import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCountryDto {
	@IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nameCountry: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  route: string;

  @IsNotEmpty()
  @IsInt()
  status: number;
}