<template>
  <div class="flex w-full flex-col overflow-hidden bg-white">
    <img v-if="brassin.imageUrl" :src="imageBaseUrl + brassin.imageUrl"/>

    <div class="w-full bg-white px-2 py-3 text-left">
      <h3 class="font-medium">{{ brassin.name }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Brassin } from '@/core/models/Brassin';

defineProps<{
  brassin: Brassin
}>();

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
</script>

<style lang="scss" scoped></style>