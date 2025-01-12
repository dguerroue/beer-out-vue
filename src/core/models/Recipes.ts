import type { GetBaseParams } from "./Api";

export type GetRecipesParams = GetBaseParams & {};

export type RecipesResp = {
  items: Record<string, any>[],
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
}

export type RecipeResp = Record<string, any>;

// TODO : create a type PutRecipeType

export class Recipe {
  constructor(
    public id: string | undefined,
    public name: string,
    public imageUrl: string | undefined,
    public notes: string,
    public type: string[]
  ) { }
}

export class RecipeFactory {

  static buildImageUrl(json: Record<string, any>): string {
    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

    return imageBaseUrl + `${json.collectionId}/${json.id}/${json.image}`;
  }

  static createRecipe(json: Record<string, any>): Recipe {
    return new Recipe(
      json.id,
      json.name,
      json.image ? RecipeFactory.buildImageUrl(json) : "",
      json.notes,
      json.type
    );
  }

  static createRecipes(jsonArray: Record<string, any>[]): Recipe[] {
    return jsonArray.map(json => RecipeFactory.createRecipe(json));
  }
}