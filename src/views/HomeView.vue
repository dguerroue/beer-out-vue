<script setup lang="ts">
import { ref } from 'vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import BottomSheet from '@/components/BottomSheet.vue';


// const myBottomSheet = ref<InstanceType<typeof MyBottomSheet>>();
const isBottomSheetOpen = ref(false);


function openBottomSheet() {
  isBottomSheetOpen.value = !isBottomSheetOpen.value;
}
</script>

<template>
  <main>
    <div class="flex flex-col gap-4">
      <ButtonPrimary @click="openBottomSheet()">
        <span v-if="isBottomSheetOpen">
          Door is Open
        </span>
        <span v-else>
          Open the door
        </span>
      </ButtonPrimary>
    </div>

    <BottomSheet v-model:open="isBottomSheetOpen">
      <div class="px-8 pb-14">
        <h1>Lorem Ipsum</h1>
        <h2>What is Lorem Ipsum?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil ipsa tempora quidem eius iusto quam iste labore, debitis veniam velit adipisci temporibus odit officiis dolore. Repellat veniam fugiat neque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil ipsa tempora quidem eius iusto quam iste labore, debitis veniam velit adipisci temporibus odit officiis dolore. Repellat veniam fugiat neque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil ipsa tempora quidem eius iusto quam iste labore, debitis veniam velit adipisci temporibus odit officiis dolore. Repellat veniam fugiat neque.
        </p>
      </div>
    </BottomSheet>
  </main>
</template>