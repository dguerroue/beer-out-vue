<template>
  <div class="flex h-full flex-col">
    <TitleSection>
      Ma Recette
    </TitleSection>

    <ButtonGoBack label="Retour" />

    <div v-if="errorStatus === 404" class="flex grow flex-col items-center justify-center font-bold">
      <span class="text-7xl font-black">404</span>
      <p>Recette Not Found.</p>

      <ButtonBase class="mt-6" @click="router.push('/')">
        Retour à l'accueil
      </ButtonBase>
    </div>

    <div v-else class="flex grow flex-col justify-between">
      <div>
        <div class="mt-8 flex gap-4 px-2">
          <img v-if="recipe?.imageUrl" :src="baseUrlImage + recipe?.imageUrl"
            :alt="`Image de la recette ${recipe?.name}`" class="w-24 rounded-md" />

          <div class="flex flex-col">
            <h2 class="text-lg font-bold text-gray-800">{{ recipe?.name }}</h2>

            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="beerType in recipe?.type" :key="beerType.id"
                class="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">
                {{ beerType.name }}
              </span>
            </div>
          </div>

        </div>
        <div class="mt-10" v-html="recipe?.notes"></div>
      </div>

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
import TitleSection from '@/components/TitleSection.vue';
import { useCore } from '@/composables/useCore';
import type { Recipe } from '@/core/entities/Recipe';
import { ErrorWrapper } from '@/core/services/errors';
import { useRecipesStore } from '@/stores/recipesStore';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const baseUrlImage = import.meta.env.VITE_IMAGE_BASE_URL;

const core = useCore();
const router = useRouter();

const errorStatus = ref<number | undefined>();

const recipeId = String(useRoute().params.id);
const recipe = ref<Recipe>();
const recipeIsLoading = ref(true);

onMounted(async () => {
  try {
    recipeIsLoading.value = true;
    recipe.value = await core.recipesUC.getRecipeById(recipeId, {
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
    await core.recipesUC.deleteRecipe(recipeId);

    useRecipesStore().refreshRecipes();

    router.push('/');
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss" scoped></style>