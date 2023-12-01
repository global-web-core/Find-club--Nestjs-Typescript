import { PartialType } from "@nestjs/mapped-types";
import { CreateVerificationtokenDto } from "./create-verificationtoken.dto";

export class RequestByQueryParamsVerificationtokenDto extends PartialType(CreateVerificationtokenDto) {}
