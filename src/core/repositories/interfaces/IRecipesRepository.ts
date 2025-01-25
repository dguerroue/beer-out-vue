import type { Recipe } from "../../entities/Recipe";
import type { RecipePostParams, RecipesGetParams } from "../../models/Recipe";

export interface IRecipesRepository {
  getRecipes(params?: RecipesGetParams): Promise<Recipe[]>;
  getRecipeById(id: string, params?: any): Promise<Recipe>;
  createRecipe(params: RecipePostParams | FormData): Promise<Recipe>;
  editRecipe(id: string, params: RecipePostParams | FormData): Promise<Recipe>;
  deleteRecipe(id: string): Promise<void>;
}