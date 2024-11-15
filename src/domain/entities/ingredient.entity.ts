import { RequiredFieldException } from '../exceptions/domain.exception';

export class Ingredient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly type: string | null
  ) {}

  static create(
    id: string,
    name: string,
    description: string | null,
    type: string | null
  ): Ingredient {
    if (!id) throw new RequiredFieldException('id');
    if (!name) throw new RequiredFieldException('name');

    return new Ingredient(id, name, description, type);
  }
}
