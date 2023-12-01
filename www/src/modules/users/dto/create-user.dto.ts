import { IsOptional, IsString, MaxLength, IsDateString } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsDateString()
  emailVerified?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;
}
