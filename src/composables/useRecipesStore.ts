import { useCore } from "./useCore";

export function useRecipesStore() {

  return useCore().recipesStore();
}