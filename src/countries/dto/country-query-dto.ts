import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { PaginationQueryDto } from './pagination-query-dto';

export class CountryQueryDto {
  @IsNotEmpty()
  @IsString()
  search: string;

  @ValidateNested()
  pagination: PaginationQueryDto;
}
