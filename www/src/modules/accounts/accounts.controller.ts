import { Controller, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { RequestByQueryParamsAccountDto } from './dto/requestByQueryParams-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

	@Post('getAllByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsAccountDto))
  findAllByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.accountsService.findAllByQueryParams(queryParams);
  }

	@Post('getOneByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsAccountDto))
  findOneByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.accountsService.findOneByQueryParams(queryParams);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
