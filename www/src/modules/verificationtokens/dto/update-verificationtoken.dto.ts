import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificationtokenDto } from './create-verificationtoken.dto';

export class UpdateVerificationtokenDto extends PartialType(CreateVerificationtokenDto) {}