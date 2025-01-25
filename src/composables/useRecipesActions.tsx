import FormNewRecipe from "@/components/forms/FormNewRecipe.vue";
import { useBottomSheet } from "./useBottomSheet";
import { nextTick } from "vue";

let bsNewRecipeId: string;
const bs = useBottomSheet();

export function useRecipesActions() {

  function openBsFormNewRecipe() {
    if(bsNewRecipeId) {
      bs.openBottomSheetById(bsNewRecipeId);
    } else {
      bsNewRecipeId = bs.openBottomSheet(
        <div class="px-4 py-6 pb-12">
          <h1 class="text-xl font-bold">
            Ajouter une recette
          </h1>
          <FormNewRecipe onSubmit={() => bs.closeBottomSheetById(bsNewRecipeId)} onCancel={() => closeAndRemoveBsFormNewRecipe()} />
        </div>
      );
    }
  }

  function closeAndRemoveBsFormNewRecipe() {
    bs.closeBottomSheetById(bsNewRecipeId);

    nextTick(() => {
      bs.removeBottomSheet(bsNewRecipeId);
    });

    bsNewRecipeId = '';
  }

  return {
    openBsFormNewRecipe
  }
}