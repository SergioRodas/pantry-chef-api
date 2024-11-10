import { RequiredFieldException } from '../exceptions/domain.exception';

export class Meal {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly thumbnail: string
  ) {}

  static create(id: string, name: string, thumbnail: string): Meal {
    if (!id) throw new RequiredFieldException('id');
    if (!name) throw new RequiredFieldException('name');
    if (!thumbnail) throw new RequiredFieldException('thumbnail');

    return new Meal(id, name, thumbnail);
  }
}
