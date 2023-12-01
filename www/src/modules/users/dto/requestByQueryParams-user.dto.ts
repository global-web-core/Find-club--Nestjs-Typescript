import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class RequestByQueryParamsUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@IsNotEmpty()
	@MaxLength(255)
  @IsString()
  id?: string;
}
