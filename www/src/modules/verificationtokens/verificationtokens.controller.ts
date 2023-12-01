import { Controller, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { VerificationtokensService } from './verificationtokens.service';
import { CreateVerificationtokenDto } from './dto/create-verificationtoken.dto';
import { UpdateVerificationtokenDto } from './dto/update-verificationtoken.dto';
import { RequestByQueryParamsVerificationtokenDto } from './dto/requestByQueryParams-verificationtoken.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('verificationtokens')
@Controller('verificationtokens')
export class VerificationtokensController {
  constructor(private readonly verificationtokensService: VerificationtokensService) {}

  @Post()
  create(@Body() createVerificationtokenDto: CreateVerificationtokenDto) {
    return this.verificationtokensService.create(createVerificationtokenDto);
  }

	@Post('getAllByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsVerificationtokenDto))
  findAllByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.verificationtokensService.findAllByQueryParams(queryParams);
  }

	@Post('getOneByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsVerificationtokenDto))
  findOneByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.verificationtokensService.findOneByQueryParams(queryParams);
  }

  @Patch(':identifier')
  update(@Param('identifier') identifier: string, @Body() updateVerificationtokenDto: UpdateVerificationtokenDto) {
    return this.verificationtokensService.update(identifier, updateVerificationtokenDto);
  }

  @Delete(':identifier')
  remove(@Param('identifier') identifier: string) {
    return this.verificationtokensService.remove(identifier);
  }
}
