import { PartialType } from '@nestjs/mapped-types';
import { CreateCityByCountryDto } from './create-cityByCountry.dto';

export class UpdateCityByCountryDto extends PartialType(CreateCityByCountryDto) {}