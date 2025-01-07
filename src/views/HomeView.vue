<script setup lang="ts">
import { ref } from 'vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import TitleSection from '@/components/TitleSection.vue';
import ButtonIcon from '@/components/ButtonIcon.vue';
import ButtonIconAdd from '@/components/ButtonIconAdd.vue';
import ButtonIconBike from '@/components/ButtonIconBike.vue';
import BeerCardListHorizontal from '@/components/BeerCardListHorizontal.vue';


// const myBottomSheet = ref<InstanceType<typeof MyBottomSheet>>();
const isBottomSheetOpen = ref(false);


function openBottomSheet() {
  isBottomSheetOpen.value = !isBottomSheetOpen.value;
}

function onAddBrassinClick() {
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

    <div>
      <TitleSection>
        Mes brassins
        <template #actions>
          <ButtonIconAdd @click="onAddBrassinClick()"/>
        </template>
      </TitleSection>

      <BeerCardListHorizontal />

      // TESTER un truc simple en scroll horizontal sans scrollbar
    </div>

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