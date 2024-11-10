export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'HttpException';
  }
}

export class NotFoundException extends HttpException {
  constructor(resource: string) {
    super(404, `${resource} not found`);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
