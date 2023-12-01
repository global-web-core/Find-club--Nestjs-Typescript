import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryByInterestDto } from './create-categoryByInterest.dto';

export class UpdateCategoryByInterestDto extends PartialType(CreateCategoryByInterestDto) {}