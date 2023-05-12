import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { NoContentException } from '../helpers/no-content-exception';

@Injectable()
export class SearchValidationPipePipe implements PipeTransform {
  constructor(private readonly minlength: number) {}

  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.data !== 'search') {
      return;
    }

    if (metadata.type !== 'query') {
      throw new BadRequestException(
        'Validation failed: "search" must be a query parameter.',
      );
    }

    const sanitizedValue = value?.trim().toLowerCase();

    if (sanitizedValue?.length < this.minlength) {
      throw new NoContentException(
        `Validation failed: "search" must be at least ${this.minlength} characters long.`,
      );
    }

    return sanitizedValue;
  }
}
