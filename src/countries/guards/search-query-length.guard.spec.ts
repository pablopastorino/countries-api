import { ExecutionContext } from '@nestjs/common';
import { SearchQueryLengthGuard } from './search-query-length.guard';
import { NoContentException } from '../helpers/no-content-exception';
import { BadRequestException } from '@nestjs/common';

describe('SearchQueryLengthGuard', () => {
  const MIN_LENGTH = 3;
  let guard: SearchQueryLengthGuard;

  const createMockQueryContext = (
    searchValue: string | undefined = undefined,
  ) => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          query: searchValue !== undefined ? { search: searchValue } : {},
        }),
      }),
    } as ExecutionContext;
  };

  beforeEach(() => {
    guard = new SearchQueryLengthGuard(MIN_LENGTH);
  });

  it('Should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('Should throw BadRequestException if search query is missing', () => {
    // Given
    const mockEmptyQueryContext = createMockQueryContext();

    // When
    const canActivateEmptyQuery = () =>
      guard.canActivate(mockEmptyQueryContext);

    // Then
    expect(canActivateEmptyQuery).toThrow(BadRequestException);
  });

  it('Should throw NoContentException if search query is too short', () => {
    // Given
    const mockShortQueryContext = createMockQueryContext('ab');

    // When
    const canActivateShortQuery = () =>
      guard.canActivate(mockShortQueryContext);

    // Then
    expect(canActivateShortQuery).toThrow(NoContentException);
  });

  it('Should return true if search query is valid', () => {
    // Given
    const mockValidContext = createMockQueryContext('valid');

    // When
    const canActivateValidQuery = guard.canActivate(mockValidContext);

    // Then
    expect(canActivateValidQuery).toBe(true);
  });
});
