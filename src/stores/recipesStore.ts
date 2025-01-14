import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from '@/core/entities/Recipe'
import { useCore } from '@/composables/useCore'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([]);
  const isRecipesLoading = ref<boolean>(false);

  const core = useCore();

  async function fetchRecipes(params?: { force: boolean }): Promise<Ref<Recipe[]>> {

    if (params?.force || recipes.value.length === 0) {
      isRecipesLoading.value = true;
      // await new Promise(resolve => setTimeout(resolve, 2000));
      recipes.value = await core.recipesUC.getRecipes();
      isRecipesLoading.value = false;
      return recipes;
    } else {
      return recipes;
    }

  }

  async function refreshRecipes(): Promise<void> {
    await fetchRecipes({ force: true });
  }

  return {
    recipes,
    isRecipesLoading,
    fetchRecipes,
    refreshRecipes
  }
})
