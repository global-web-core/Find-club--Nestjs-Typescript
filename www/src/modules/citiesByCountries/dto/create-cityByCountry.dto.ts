import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCityByCountryDto {
	@IsNotEmpty()
  @IsInt()
  idCountry: number;

  @IsNotEmpty()
  @IsInt()
  idCity: number;

  @IsNotEmpty()
  @IsInt()
  status: number;
}