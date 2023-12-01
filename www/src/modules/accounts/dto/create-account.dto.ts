import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAccountDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  userId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  provider: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  providerAccountId: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsString()
  access_token?: string;

  @IsOptional()
  @IsInt()
  expires_at?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  token_type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  scope?: string;

  @IsOptional()
  @IsString()
  id_token?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  session_state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  oauth_token_secret?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  oauth_token?: string;
}
