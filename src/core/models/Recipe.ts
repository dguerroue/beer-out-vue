import type { BaseGetParams } from "./Api";

export type RecipesGetParams = BaseGetParams & {};

export type RecipePostParams = {
  user: string,
  type?: string[],
  name: string,
  notes?: string,
  image?: File,
}

export type RecipesResp = {
  items: Record<string, any>[],
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
}

export type RecipeResp = Record<string, any>;

// TODO : create a type "RecipePutParams"