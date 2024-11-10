export class Meal {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly thumbnail: string
  ) {}

  static create(id: string, name: string, thumbnail: string): Meal {
    if (!id || !name || !thumbnail) {
      throw new Error('Meal must have an id, name and thumbnail');
    }

    return new Meal(id, name, thumbnail);
  }
}
