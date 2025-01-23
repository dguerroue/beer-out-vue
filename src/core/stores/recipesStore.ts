import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from '@/core/entities/Recipe'
import type RecipesUsecases from '../usecases/recipesUC';
import type { RecipePostParams, RecipesGetParams } from '../models/Recipe';

export function createRecipesStore(recipesUsecases: RecipesUsecases) {
  return defineStore('recipes', () => {
    const recipes = ref<Recipe[]>([]);
    const isRecipesLoading = ref<boolean>(false);

    async function createRecipe(params: RecipePostParams | FormData): Promise<Recipe> {
      return await recipesUsecases.createRecipe(params);
    }
  
    async function getRecipes(force: boolean = false, params?: RecipesGetParams): Promise<Ref<Recipe[]>> {
  
      if (force || recipes.value.length === 0) {
        isRecipesLoading.value = true;
        // await new Promise(resolve => setTimeout(resolve, 2000));
        recipes.value = await recipesUsecases.getRecipes(params);
        isRecipesLoading.value = false;
        return recipes;
      } else {
        return recipes;
      }
  
    }

    async function getRecipeById(id: string, params?: any): Promise<Recipe> {
      return await recipesUsecases.getRecipeById(id, params);
    }
  
    async function refreshRecipes(): Promise<void> {
      await getRecipes(true);
    }

    async function editRecipe(id: string, params: RecipePostParams | FormData): Promise<Recipe> {
      return await recipesUsecases.editRecipe(id, params);
    }

    async function deleteRecipe(id: string): Promise<void> {
      await recipesUsecases.deleteRecipe(id);
    }
  
    return {
      recipes,
      isRecipesLoading,
      createRecipe,
      getRecipes,
      getRecipeById,
      refreshRecipes,
      editRecipe,
      deleteRecipe
    }
  });

};

