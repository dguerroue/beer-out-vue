<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BottomSheet from '@/components/BottomSheet.vue';
import TitleSection from '@/components/TitleSection.vue';
import ButtonIconAdd from '@/components/ButtonIconAdd.vue';
import BeerCardListHorizontal from '@/components/BeerCardListHorizontal.vue';
import { useCore } from '@/composables/useCore';
import type { Brassin } from '@/core/models/Brassin';

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

const core = useCore();

const brassins = ref<Brassin[]>();

onMounted(async () => {
  brassins.value = await core.brassinUC.getBrassins()
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

      <BeerCardListHorizontal v-if="brassins && brassins.length" :brassins="brassins"
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
        <template #actions>
          <ButtonIconAdd @click="onAddRecipeClick()" class="ml-2" />
        </template>
      </TitleSection>

      <BeerCardListHorizontal v-if="brassins && brassins.length" :brassins="brassins"
        seemore-label="Voir toutes les recettes" />
    </section>

    <BottomSheet v-model:open="isBottomSheetOpen">
      <div class="px-8 pb-14">
        <h1>Ajouter un brassin</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil ipsa tempora quidem eius iusto quam
          iste
          labore, debitis veniam velit adipisci temporibus odit officiis dolore. Repellat veniam fugiat neque.
        </p>
      </div>
    </BottomSheet>
  </main>
</template>