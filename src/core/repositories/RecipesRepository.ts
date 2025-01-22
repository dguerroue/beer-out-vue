import { Recipe } from "../entities/Recipe";
import { RecipeMapper } from "../mappers/RecipeMapper";
import type { RecipePostParams, RecipeResp, RecipesGetParams, RecipesResp } from "../models/Recipe";
import type { ApiService } from "../services/api";
import type { IRecipesRepository } from "./interfaces/IRecipesRepository";

export class ApiRecipesRepository implements IRecipesRepository {
  constructor(private api: ApiService) {}

   async getRecipes(params?: RecipesGetParams): Promise<Recipe[]> {
      const defaultParams: RecipesGetParams = {
        sort: "-created"
      }
  
      const resp = await this.api.get<RecipesResp>("collections/recipes/records", {
        ...defaultParams,
        ...params
      });
  
      return RecipeMapper.fromJsonArrayToRecipes(resp.items);
    }
  
    async getRecipeById(id: string, params?: any): Promise<Recipe> {
      const resp = await this.api.get<RecipeResp>(`collections/recipes/records/${id}`, {
        ...params
      });
  
      return RecipeMapper.fromJsonToRecipe(resp);
    }
  
    async createRecipe(params: RecipePostParams | FormData): Promise<Recipe> {
      // this.api.pbInstance.collection('recipes').create(params);
      const resp = this.api.post<Recipe>("collections/recipes/records", params);
  
      return RecipeMapper.fromJsonToRecipe(resp);
    }
  
    async deleteRecipe(id: string): Promise<void> {
      await this.api.delete(`collections/recipes/records/${id}`);
    }
}
