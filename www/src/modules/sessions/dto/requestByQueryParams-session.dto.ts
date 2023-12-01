import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class RequestByQueryParamsSessionDto extends PartialType(CreateSessionDto) {
	@IsOptional()
	@IsNotEmpty()
	@MaxLength(255)
  @IsString()
  id?: string;
}
