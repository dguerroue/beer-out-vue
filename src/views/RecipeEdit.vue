<template>
  <div class="flex h-full flex-col">
    <TitleSection>
      Ma Recette - Edit
    </TitleSection>

    <ButtonGoBack label="Retour" @click="router.push(`/recipe/${recipeId}`)" />

    <div v-if="errorStatus === 404" class="flex grow flex-col items-center justify-center font-bold">
      <span class="text-7xl font-black">404</span>
      <p>Recette Not Found.</p>

      <ButtonBase class="mt-6" @click="router.push('/')">
        Retour à l'accueil
      </ButtonBase>
    </div>

    <div v-else-if="recipe" class="flex grow flex-col justify-between">
      <FormEditRecipe :recipe="recipe" @submit="router.push(`/recipe/${recipeId}`)" @cancel="router.push(`/recipe/${recipeId}`)" />

      <div class="mb-6 mt-8 flex justify-center">
        <ButtonConfirm @confirm="onConfirmDeleteRecipe">
          Supprimer la recette

          <template #confirm>
            <b class="font-semibold">Supprimer la recette ?</b>
          </template>
        </ButtonConfirm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonBase from '@/components/ButtonBase.vue';
import ButtonConfirm from '@/components/ButtonConfirm.vue';
import ButtonGoBack from '@/components/ButtonGoBack.vue';
import FormEditRecipe from '@/components/forms/FormEditRecipe.vue';
import TitleSection from '@/components/TitleSection.vue';
import { useCore } from '@/composables/useCore';
import type { Recipe } from '@/core/entities/Recipe';
import { ErrorWrapper } from '@/core/services/errors';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const core = useCore();
const router = useRouter();

const recipeStore = core.recipesStore();

const errorStatus = ref<number | undefined>();

const recipeId = String(useRoute().params.id);
const recipe = ref<Recipe>();
const recipeIsLoading = ref(true);

onMounted(async () => {
  try {
    recipeIsLoading.value = true;
    recipe.value = await recipeStore.getRecipeById(recipeId, {
      expand: ['type']
    });
  } catch (error: any) {
    if (error instanceof ErrorWrapper) {
      errorStatus.value = error.status;
    } else {
      console.error(error);
    }
  } finally {
    recipeIsLoading.value = false;
  }
})

async function onConfirmDeleteRecipe() {
  try {
    await recipeStore.deleteRecipe(recipeId);

    recipeStore.refreshRecipes();

    router.push('/');
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss" scoped></style>