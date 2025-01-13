import { Recipe } from "../entities/Recipe";
import { type GetRecipesParams, type PostRecipeParams, type RecipeResp, type RecipesResp } from "../models/Recipe";
import type { ApiService } from "../services/api";

export default class RecipesUsecases {

  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private api: ApiService) { }

  async getRecipes(params?: GetRecipesParams): Promise<Recipe[]> {
    const resp = await this.api.get<RecipesResp>("collections/recipes/records", {
      ...params
    });

    return resp.items.map(json => Recipe.fromJsonToRecipe(json));
  }

  async getRecipeById(id: string, params?: any): Promise<Recipe> {
    const resp = await this.api.get<RecipeResp>(`collections/recipes/records/${id}`, {
      ...params
    });

    return Recipe.fromJsonToRecipe(resp);
  }

  async createRecipe(params: PostRecipeParams | FormData): Promise<Recipe> {
    // this.api.pbInstance.collection('recipes').create(params);
    const resp = this.api.post<Recipe>("collections/recipes/records", params);

    return Recipe.fromJsonToRecipe(resp);
  }
}