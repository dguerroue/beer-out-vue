<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import TitleSection from '@/components/TitleSection.vue';
import ButtonIconAdd from '@/components/ButtonIconAdd.vue';
import { useCore } from '@/composables/useCore';
import { useRouter } from 'vue-router';
import CardListHorizontal from '@/components/CardListHorizontal.vue';
import { useBottomSheet } from '@/composables/useBottomSheet';
import FormNewRecipe from '@/components/forms/FormNewRecipe.vue';
import type { Brassin } from '@/core/entities/Brassin';
import type { Recipe } from '@/core/entities/Recipe';
import { useRecipesStore } from '@/stores/recipesStore';
import { storeToRefs } from 'pinia';
import LoaderSkeleton from '@/components/LoaderSkeleton.vue';

const core = useCore();
const router = useRouter();
const bs = useBottomSheet();

const recipesStore = useRecipesStore();

const brassins = ref<Brassin[]>();
const { recipes, isRecipesLoading } = storeToRefs(recipesStore);

// function onAddBrassinClick() {
//   openBottomSheet();
// }
function onAddRecipeClick() {
  const idRecipeBs = bs.openBottomSheet(
    <FormNewRecipe onSubmit={() => { bs.closeBottomSheetById(idRecipeBs) }} />
  );
}

// function onBrassinClick(brassin: Brassin) {
//   router.push({
//     path: `/brassin/${brassin.id}`
//   });
// }

function onRecipeClick(recipe: Recipe) {
  router.push({
    path: `/recipe/${recipe.id}`
  });
}

onMounted(async () => {
  // brassins.value = await core.brassinUC.getBrassins();
  await recipesStore.fetchRecipes();

})
</script>

<template>
  <main class="space-y-10">

    <!-- <section>
      <TitleSection>
        Mes brassins
        <template v-if="brassins && brassins.length" #actions>
          <ButtonIconAdd @click="onAddBrassinClick()" class="ml-2" />
        </template>
</TitleSection>

<CardListHorizontal v-if="brassins && brassins.length" :items="brassins" :on-item-click="onBrassinClick"
  seemore-label="Voir tout les brassins" />
<div v-else class="flex w-full flex-row gap-3 overflow-x-auto *:flex-none">
  <div class="flex min-h-[180px] w-2/5 flex-col items-center justify-center gap-2 bg-gray-100 p-3 text-center">
    <ButtonIconAdd @click="onAddBrassinClick()" class="ml-2" size="40" />
    <span>Ajouter un brassin</span>
  </div>
</div>
</section> -->

    <section>
      <TitleSection>
        Mes recettes
        <template v-if="!isRecipesLoading && recipes && recipes.length" #actions>
          <ButtonIconAdd @click="onAddRecipeClick()" class="ml-2" />
        </template>
      </TitleSection>

      <div v-if="isRecipesLoading" class="flex gap-3">
        <LoaderSkeleton class="h-[230px] w-[130px] rounded-md" />
        <LoaderSkeleton class="h-[230px] w-[130px] rounded-md" />
      </div>

      <template v-else>
        <CardListHorizontal v-if="recipes && recipes.length" :items="recipes" :on-item-click="onRecipeClick"
          seemore-label="Voir toutes les recettes" />

        <div v-else class="flex w-full flex-row gap-3 overflow-x-auto *:flex-none" @click="onAddRecipeClick()">
          <div class="flex min-h-[180px] w-2/5 flex-col items-center justify-center gap-2 bg-gray-100 p-3 text-center">
            <ButtonIconAdd class="ml-2" size="40" />
            <span>Ajouter une recette</span>
          </div>
        </div>
      </template>

    </section>
  </main>
</template>