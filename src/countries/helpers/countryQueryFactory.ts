import { CountryQueryDto } from '../dto/country-query-dto';

export const countryQueryFactory = (
  query: CountryQueryDto,
): Record<string, never> => {
  const {
    search,
    pagination: { limit, offset },
  } = query;

  const queryObj: Record<string, any> = {
    where: { country: { contains: search } },
    skip: offset,
    take: limit,
  };

  return queryObj as Record<string, never>;
};
