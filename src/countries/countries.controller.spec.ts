import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { PrismaService } from '../services/prisma/prisma.service';

const countries = [
  { id: 1, country: 'India', population: 1_409_902_000, percentage: 0.1 },
  { id: 2, country: 'China', population: 1_403_426_000, percentage: 0.1 },
  {
    id: 3,
    country: 'Estados Unidos',
    population: 331_800_000,
    percentage: 0.1,
  },
  { id: 4, country: 'Indonesia', population: 271_629_000, percentage: 0.1 },
  { id: 5, country: 'Pakistán', population: 224_654_000, percentage: 0.1 },
  { id: 6, country: 'Nigeria', population: 219_743_000, percentage: 0.1 },
  { id: 7, country: 'Brasil', population: 211_420_000, percentage: 0.1 },
  { id: 8, country: 'Bangladés', population: 181_781_000, percentage: 0.1 },
  { id: 9, country: 'Rusia', population: 146_712_000, percentage: 0.1 },
  { id: 10, country: 'México', population: 127_792_000, percentage: 0.1 },
];

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [CountriesService, PrismaService],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return countries with valid search query and pagination', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(countries);

      const result = await controller.findAll('test', 0, 5);

      expect(service.findAll).toHaveBeenCalledWith({
        search: 'test',
        pagination: {
          limit: 5,
          offset: 0,
        },
      });

      expect(result).toEqual(countries);
    });

    it('Should an empty object with invalid search query length', async () => {
      const result = await controller.findAll('te', 0, 5);

      expect(result).toEqual([]);
    });
  });
});
