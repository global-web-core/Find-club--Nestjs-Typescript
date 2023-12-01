import { Controller, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestByQueryParamsUserDto } from './dto/requestByQueryParams-user.dto';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

	@Post('getAllByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsUserDto))
  findAllByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.usersService.findAllByQueryParams(queryParams);
  }

	@Post('getOneByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsUserDto))
  findOneByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.usersService.findOneByQueryParams(queryParams);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
