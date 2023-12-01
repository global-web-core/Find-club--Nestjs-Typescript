import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCategoryByInterestDto {
	@IsNotEmpty()
  @IsInt()
  idInterest: number;

  @IsNotEmpty()
  @IsInt()
  idCategory: number;

  @IsNotEmpty()
  @IsInt()
  status: number;
}