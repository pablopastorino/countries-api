import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../services/prisma/prisma.service';
import { CountriesService } from './countries.service';
import { PaginationQueryDto } from './dto/pagination-query-dto';

describe('CountriesService', () => {
  let service: CountriesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: PrismaService,
          useValue: {
            country: {
              findMany: jest.fn(),
              aggregate: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll()', () => {
    it('Should return an array of countries', async () => {
      // Given
      const search = 'Argentina';
      const pagination: PaginationQueryDto = {
        offset: 0,
        limit: 5,
      };
      const query = { search, pagination };
      const totalPopulation = 1_000_000;
      const expectedCountries = [
        {
          id: 1,
          country: 'Argentina',
          population: 500000,
          percentage: 0.5,
        },
        {
          id: 2,
          country: 'Spain',
          population: 300000,
          percentage: 0.3,
        },
      ];

      (prismaService.country.aggregate as jest.Mock).mockResolvedValue({
        _sum: { population: totalPopulation },
      });

      (prismaService.country.findMany as jest.Mock).mockResolvedValue(
        expectedCountries,
      );

      // When
      const result = await service.findAll(query);

      // Then
      expect(prismaService.country.aggregate).toHaveBeenCalled();

      expect(prismaService.country.findMany).toHaveBeenCalledWith({
        where: { country: { contains: search } },
        skip: pagination.offset,
        take: pagination.limit,
      });

      expect(result).toEqual(expectedCountries);
    });
  });

  describe('getTotalPopulation()', () => {
    it('Should return the total population', async () => {
      // Given
      const totalPopulation = 1_000_000;

      (prismaService.country.aggregate as jest.Mock).mockResolvedValue({
        _sum: { population: totalPopulation },
      });

      // When
      const result = await service.getTotalPopulation();

      // Then
      expect(prismaService.country.aggregate).toHaveBeenCalled();

      expect(result).toEqual(totalPopulation);
    });
  });
});
