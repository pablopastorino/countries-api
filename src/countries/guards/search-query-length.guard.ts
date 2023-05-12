import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { NoContentException } from '../helpers/no-content-exception';

@Injectable()
export class SearchQueryLengthGuard implements CanActivate {
  constructor(private readonly minLength: number) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const searchQuery = request.query?.search;

    if (!('search' in request.query)) {
      throw new BadRequestException('Search query is missing');
    }

    if (searchQuery?.length < this.minLength) {
      throw new NoContentException('Search query is too short');
    }

    return true;
  }
}
