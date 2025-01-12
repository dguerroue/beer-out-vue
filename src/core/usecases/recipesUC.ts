import { type ListBaseResp } from "../models/Api";
import { type BeerType, type GetRecipesParams, type Recipe, type RecipesResp, RecipeFactory } from "../models/Recipes";
import type { ApiService } from "../services/api";

export default class RecipesUsecases {

  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private api: ApiService) { }

  async getRecipes(params?: GetRecipesParams): Promise<Recipe[]> {
    const resp = await this.api.get<RecipesResp>("collections/recipes/records", {
      ...params
    });

    return RecipeFactory.createRecipes(resp.items);
  }

  async getRecipe(id: string, params?: any): Promise<Recipe> {
    type RecipeResp = any; /// TODO: Define RecipeResp type

    const resp = await this.api.get<RecipeResp>(`collections/recipes/records/${id}`, {
      ...params
    });

    return RecipeFactory.createRecipe(resp);
  }

  async getBeerTypes(): Promise<BeerType[]> {
    const resp = await this.api.get<ListBaseResp>("collections/beertype/records");

    return RecipeFactory.createBeerTypes(resp.items);
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const resp = await this.api.post<Recipe>("collections/recipes/records", recipe);

    return RecipeFactory.createRecipe(resp);
  }
}