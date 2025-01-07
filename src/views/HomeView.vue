<script setup lang="ts">
import { ref } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';
import TitleSection from '@/components/TitleSection.vue';
import ButtonIconAdd from '@/components/ButtonIconAdd.vue';
import BeerCardListHorizontal from '@/components/BeerCardListHorizontal.vue';


// const myBottomSheet = ref<InstanceType<typeof MyBottomSheet>>();
const isBottomSheetOpen = ref(false);


function openBottomSheet() {
  isBottomSheetOpen.value = !isBottomSheetOpen.value;
}

function onAddBrassinClick() {
  openBottomSheet();
}
function onAddRecipeClick() {
  openBottomSheet();
}
</script>

<template>
  <main>
    <!-- <div class="flex flex-col gap-4">
      <ButtonPrimary @click="openBottomSheet()">
        <span v-if="isBottomSheetOpen">
          Door is Open
        </span>
        <span v-else>
          Open the door
        </span>
      </ButtonPrimary>
    </div> -->

    <section>
      <TitleSection>
        Mes brassins
        <template #actions>
          <ButtonIconAdd @click="onAddBrassinClick()" class="ml-2"/>
        </template>
      </TitleSection>

      <BeerCardListHorizontal seemore-label="Voir tout les brassins" />
    </section>

    <section class="mt-4">
      <TitleSection>
        Mes recettes
        <template #actions>
          <ButtonIconAdd @click="onAddRecipeClick()" class="ml-2"/>
        </template>
      </TitleSection>

      <BeerCardListHorizontal seemore-label="Voir toutes les recettes" />
    </section>

    <BottomSheet v-model:open="isBottomSheetOpen">
      <div class="px-8 pb-14">
        <h1>Ajouter un brassin</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil ipsa tempora quidem eius iusto quam iste labore, debitis veniam velit adipisci temporibus odit officiis dolore. Repellat veniam fugiat neque.
        </p>
      </div>
    </BottomSheet>
  </main>
</template>