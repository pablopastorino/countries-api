import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { SearchValidationPipePipe } from './pipes/search-validation-pipe.pipe';
import { ApiTags } from '@nestjs/swagger';
import { SearchQueryLengthGuard } from './guards/search-query-length.guard';

@Controller('countries')
@ApiTags('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @UseGuards(new SearchQueryLengthGuard(3))
  @UsePipes(new SearchValidationPipePipe(3))
  findAll(
    @Query('search') search: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return this.countriesService.findAll({
      search,
      pagination: { limit, offset },
    });
  }
}
