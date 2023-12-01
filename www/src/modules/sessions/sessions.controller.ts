import { Controller, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { RequestByQueryParamsSessionDto } from './dto/requestByQueryParams-session.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';
import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

	@Post('getAllByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsSessionDto))
  findAllByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.sessionsService.findAllByQueryParams(queryParams);
  }

	@Post('getOneByPost')
	@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParamsSessionDto))
  findOneByQueryParamsByPost(@Body() queryParams: HttpQueryParamsFromUrl) {
    return this.sessionsService.findOneByQueryParams(queryParams);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
