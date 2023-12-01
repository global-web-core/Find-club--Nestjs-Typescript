import { IsNotEmpty, IsOptional, IsString, MaxLength, IsDateString } from "class-validator";

export class CreateSessionDto {
  @IsNotEmpty()
  @IsDateString()
  expires: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  sessionToken: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  userId?: string;
}
