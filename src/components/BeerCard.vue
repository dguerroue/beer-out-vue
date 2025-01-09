<template>
  <div class="beer-card-wrapper flex w-full flex-col overflow-hidden rounded-md bg-white">
    <img v-if="brassin.imageUrl" :src="imageBaseUrl + brassin.imageUrl" class="py-4" />

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

<style lang="scss" scoped>
.beer-card-wrapper {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>