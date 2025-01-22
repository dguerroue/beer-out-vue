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
        <FormNewRecipe onSubmit={() => bs.closeBottomSheetById(bsNewRecipeId)} onCancel={() => closeAndRemoveBsFormNewRecipe()} />
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