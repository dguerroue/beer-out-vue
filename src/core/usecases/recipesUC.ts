import { Recipe } from "../entities/Recipe";
import { type RecipesGetParams, type RecipePostParams } from "../models/Recipe";
import type { IRecipesRepository } from "../repositories/IRecipesRepository";

export default class RecipesUsecases {

  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private repo: IRecipesRepository) { }

  async getRecipes(params?: RecipesGetParams): Promise<Recipe[]> {
    return this.repo.getRecipes(params);
  }

  async getRecipeById(id: string, params?: any): Promise<Recipe> {
    return this.repo.getRecipeById(id, params);
  }

  async createRecipe(params: RecipePostParams | FormData): Promise<Recipe> {
    return this.repo.createRecipe(params);
  }

  async deleteRecipe(id: string): Promise<void> {
    this.repo.deleteRecipe(id);
  }
}