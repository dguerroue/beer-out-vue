<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import TitleSection from '@/components/TitleSection.vue';
import ButtonIconAdd from '@/components/ButtonIconAdd.vue';
import { useCore } from '@/composables/useCore';
import type { Brassin } from '@/core/models/Brassin';
import { useRouter } from 'vue-router';
import type { Recipe } from '@/core/models/Recipes';
import CardListHorizontal from '@/components/CardListHorizontal.vue';
import { useBottomSheet } from '@/composables/useBottomSheet';
import FormNewRecipe from '@/components/forms/FormNewRecipe.vue';

const core = useCore();
const router = useRouter();
const bs = useBottomSheet();

// const myBottomSheet = ref<InstanceType<typeof MyBottomSheet>>();
const isBottomSheetOpen = ref(false);

const brassins = ref<Brassin[]>();
const recipes = ref<Recipe[]>();

function openBottomSheet() {
  isBottomSheetOpen.value = !isBottomSheetOpen.value;
}

function onAddBrassinClick() {
  openBottomSheet();
}
function onAddRecipeClick() {
  const idRecipeBs = bs.openBottomSheet(
    <FormNewRecipe onSubmit={() => { bs.closeBottomSheetById(idRecipeBs) }} />
  );
}

function onBrassinClick(brassin: Brassin) {
  console.log('brassin cliqué', brassin);

  router.push({
    path: `/brassin/${brassin.id}`
  })
}

onMounted(async () => {
  brassins.value = await core.brassinUC.getBrassins();
  recipes.value = await core.recipesUC.getRecipes();
})
</script>

<template>
  <main class="space-y-10">
    <!-- <div class="flex flex-col gap-4">
      <ButtonBase @click="openBottomSheet()">
        <span v-if="isBottomSheetOpen">
          Door is Open
        </span>
        <span v-else>
          Open the door
        </span>
      </ButtonBase>
    </div> -->

    <section>
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
    </section>

    <section>
      <TitleSection>
        Mes recettes
        <template v-if="recipes && recipes.length" #actions>
          <ButtonIconAdd @click="onAddRecipeClick()" class="ml-2" />
        </template>
      </TitleSection>

      <CardListHorizontal v-if="recipes && recipes.length" :items="recipes" :on-item-click="onBrassinClick"
        seemore-label="Voir toutes les recettes" />
      <div v-else class="flex w-full flex-row gap-3 overflow-x-auto *:flex-none">
        <div class="flex min-h-[180px] w-2/5 flex-col items-center justify-center gap-2 bg-gray-100 p-3 text-center">
          <ButtonIconAdd @click="onAddRecipeClick()" class="ml-2" size="40" />
          <span>Ajouter une recette</span>
        </div>
      </div>
    </section>
  </main>
</template>