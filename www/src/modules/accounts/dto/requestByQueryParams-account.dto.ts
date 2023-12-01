import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

export class RequestByQueryParamsAccountDto  extends PartialType(CreateAccountDto) {
	@IsOptional()
	@IsNotEmpty()
  @IsString()
	@MaxLength(255)
  id?: string;
}
