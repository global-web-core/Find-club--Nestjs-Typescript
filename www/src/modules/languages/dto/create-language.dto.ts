import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLanguageDto {
  @IsNotEmpty()
	@IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  route: string;

	@IsNotEmpty()
  @IsInt()
  idCountry: number;
}
