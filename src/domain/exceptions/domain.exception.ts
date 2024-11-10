export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class InvalidMealIdException extends DomainException {
  constructor() {
    super('Invalid meal ID format');
  }
}

export class RequiredFieldException extends DomainException {
  constructor(field: string) {
    super(`Required field missing: ${field}`);
  }
}
