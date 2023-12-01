import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDesireDto {
  @IsNotEmpty()
	@IsString()
	@MaxLength(255)
  idUser: string;

	@IsNotEmpty()
  @IsInt()
  idMeeting: number;

	@IsNotEmpty()
  @IsInt()
  statusOrganizer: number;

	@IsNotEmpty()
  @IsInt()
  statusWish: number;

	@IsNotEmpty()
  @IsInt()
  statusReadiness: number;

	@IsNotEmpty()
  @IsInt()
  status: number;
}
