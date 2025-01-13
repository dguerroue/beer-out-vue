import type { GetParamsBase } from "./Api";

export type GetRecipesParams = GetParamsBase & {};

export type PostRecipeParams = {
  user: string,
  type?: string[],
  name: string,
  notes?: string,
}

export type RecipesResp = {
  items: Record<string, any>[],
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
}

export type RecipeResp = Record<string, any>;

// TODO : create a type PutRecipeType