import { Injectable } from '@nestjs/common';

import { CountryQueryDto } from './dto/country-query-dto';
import { countryQueryFactory } from './helpers/countryQueryFactory';
import { populate } from './helpers/populate';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class CountriesService {
  constructor(private prismaService: PrismaService) {}

  async findAll(query: CountryQueryDto) {
    const queryParams = countryQueryFactory(query);
    const countries = await this.prismaService.country.findMany(queryParams);

    const totalPopulation = await this.getTotalPopulation();

    return populate(countries, totalPopulation);
  }

  async getTotalPopulation(): Promise<number> {
    const result = await this.prismaService.country.aggregate({
      _sum: { population: true },
    });
    return result._sum.population;
  }
}
