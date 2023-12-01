import { PartialType } from '@nestjs/mapped-types';
import { CreateDesireDto } from './create-desire.dto';

export class UpdateDesireDto extends PartialType(CreateDesireDto) {}