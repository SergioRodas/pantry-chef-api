export class MealIngredient {
  constructor(
    public readonly name: string,
    public readonly measure: string
  ) {}

  static create(name: string, measure: string): MealIngredient | null {
    if (!name || !measure || name === '' || measure === '') {
      return null;
    }
    return new MealIngredient(name, measure);
  }
}

export class MealDetail {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: string,
    public readonly area: string,
    public readonly instructions: string,
    public readonly thumbnail: string,
    public readonly tags: string[],
    public readonly youtube: string | null,
    public readonly ingredients: MealIngredient[],
    public readonly source: string | null
  ) {}

  static create(
    id: string,
    name: string,
    category: string,
    area: string,
    instructions: string,
    thumbnail: string,
    tags: string[],
    youtube: string | null,
    ingredients: MealIngredient[],
    source: string | null
  ): MealDetail {
    if (!id || !name || !category || !area || !instructions || !thumbnail) {
      throw new Error('Required fields are missing');
    }

    return new MealDetail(
      id,
      name,
      category,
      area,
      instructions,
      thumbnail,
      tags,
      youtube,
      ingredients,
      source
    );
  }
}
