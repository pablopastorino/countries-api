export const populate = (countries: any[], totalPopulation: number) => {
  return countries.map((country) => {
    return {
      ...country,
      percentage: country.population / totalPopulation,
    };
  });
};
