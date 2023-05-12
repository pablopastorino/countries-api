import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { SearchValidationPipePipe } from './search-validation-pipe.pipe';

describe('SearchValidationPipePipe', () => {
  let searchValidationPipePipe: SearchValidationPipePipe;
  const MIN_LENGTH = 3;

  beforeAll(() => {
    searchValidationPipePipe = new SearchValidationPipePipe(MIN_LENGTH);
  });

  it('Should be defined', () => {
    expect(searchValidationPipePipe).toBeDefined();
  });

  it('Should return sanitized value', () => {
    // Given
    const value = '  ArgeNtinA   ';
    const metadata: ArgumentMetadata = { data: 'search', type: 'query' };
    const sanitized = 'argentina';

    // When
    const result = searchValidationPipePipe.transform(value, metadata);

    // Then
    expect(result).toBe(sanitized);
  });

  it('Should return void if data is not "search"', () => {
    // Given
    const value = 'test';
    const metadata: ArgumentMetadata = { data: 'invalid', type: 'query' };

    // When
    const result = searchValidationPipePipe.transform(value, metadata);

    // Then
    expect(result).toBe(undefined);
  });

  it('Should throw BadRequestException if type is not "query"', () => {
    // Given
    const value = 'test';
    const metadata: ArgumentMetadata = { data: 'search', type: 'custom' };

    // When
    const invalidTypeCallback = () =>
      searchValidationPipePipe.transform(value, metadata);

    // Then
    expect(invalidTypeCallback).toThrow(BadRequestException);
  });

  it('Should throw HttpException with NO_CONTENT status if value length is less than the minimun specified length', () => {
    // Given
    const value = 'ab';
    const metadata: ArgumentMetadata = { data: 'search', type: 'query' };

    // When
    const invalidValueLengthCallback = () =>
      searchValidationPipePipe.transform(value, metadata);

    // Then
    expect(invalidValueLengthCallback).toThrow(
      new HttpException(
        `Validation failed: "search" must be at least ${MIN_LENGTH} characters long.`,
        HttpStatus.NO_CONTENT,
      ),
    );
  });
});
