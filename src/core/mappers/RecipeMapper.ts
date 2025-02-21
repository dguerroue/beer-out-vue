import { BeerType } from "../entities/BeerType";
import { Recipe } from "../entities/Recipe";

export class RecipeMapper {
  static fromJsonToRecipe(json: Record<string, any>): Recipe {
    return new Recipe(
      json.id,
      json.name,
      json.image ? `${json.collectionId}/${json.id}/${json.image}` : "",
      json.description,
      json.expand?.type ? json.expand.type.map((type: Record<string, any>) => BeerType.fromJsonToBeerType(type)) : []
    );
  }

  static fromJsonArrayToRecipes(items: Record<string, any>[]): Recipe[] {
    return items.map((item: Record<string, any>) => RecipeMapper.fromJsonToRecipe(item));
  }
}