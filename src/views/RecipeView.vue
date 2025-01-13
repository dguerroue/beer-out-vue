<template>
  <div>
    <TitleSection>
      Ma Recette
    </TitleSection>

    <ButtonGoBack label="Retour" />

    <div class="mt-8 flex gap-4 px-2">
      <img :src="recipe?.imageUrl" :alt="`Image de la recette ${recipe?.name}`" class="size-24" />

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
</template>

<script lang="ts" setup>
import ButtonGoBack from '@/components/ButtonGoBack.vue';
import TitleSection from '@/components/TitleSection.vue';
import { useCore } from '@/composables/useCore';
import type { Recipe } from '@/core/entities/Recipe';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const core = useCore();
const router = useRouter();

const recipeId = String(useRoute().params.id);
const recipe = ref<Recipe>();
const recipeIsLoading = ref(true);

onMounted(async () => {
  try {
    recipeIsLoading.value = true;
    recipe.value = await core.recipesUC.getRecipeById(recipeId, {
      expand: ['type']
    });
  } catch (error) {
    console.error(error);
  } finally {
    recipeIsLoading.value = false;
  }
})
</script>

<style lang="scss" scoped></style>