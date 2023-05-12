import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContentException extends HttpException {
  constructor(message?: string | object | any) {
    super(message, HttpStatus.NO_CONTENT);
  }
}
