import { Country } from 'src/types/country/country.interface';

export const populate = (countries: Country[], totalPopulation: number) => {
  return countries.map((country) => {
    return {
      ...country,
      percentage: country.population / totalPopulation,
    };
  });
};
