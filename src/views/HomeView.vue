<script setup lang="ts">
import { ref } from 'vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import MyBottomSheet from '@/components/MyBottomSheet.vue';


const myBottomSheet = ref<InstanceType<typeof MyBottomSheet>>()


function openBottomSheet() {
  console.log('Opening the bottom sheet');
  myBottomSheet.value?.open();
}
</script>

<template>
  <main>
    <div class="flex flex-col gap-4">
      <ButtonPrimary @click="openBottomSheet()">Open the door</ButtonPrimary>
    </div>

    <MyBottomSheet ref="myBottomSheet" >
      <div class="px-8 pb-10">
        <h1>Lorem Ipsum</h1>
        <h2>What is Lorem Ipsum?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil ipsa tempora quidem eius iusto quam iste labore, debitis veniam velit adipisci temporibus odit officiis dolore. Repellat veniam fugiat neque.
        </p>
      </div>
    </MyBottomSheet>
  </main>
</template>