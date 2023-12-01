import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestByCityDto } from './create-interestByCity.dto';

export class UpdateInterestByCityDto extends PartialType(CreateInterestByCityDto) {}