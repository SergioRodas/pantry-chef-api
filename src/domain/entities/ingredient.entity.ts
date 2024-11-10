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
    if (!id || !name) {
      throw new Error('Ingredient must have an id and name');
    }

    return new Ingredient(id, name, description, type);
  }
}
