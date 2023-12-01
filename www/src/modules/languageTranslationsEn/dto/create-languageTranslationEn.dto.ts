import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLanguageTranslationEnDto {
	@IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nameText: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  translation: string;
}