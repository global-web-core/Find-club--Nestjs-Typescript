import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
	@IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nameCategory: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  route: string;

  @IsNotEmpty()
  @IsInt()
  status: number;
}
