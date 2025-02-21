<template>
  <div class="grid w-full grid-cols-2 gap-3 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
    <div
      v-for="item in items"
      :key="item.id"
      class="w-[var(--child-width)] cursor-pointer transition-transform hover:scale-105 active:scale-95"
      @click="onItemClick && onItemClick(item)"
    >
      <BeerCard :item="item" class="h-full" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Brassin } from '@/core/entities/Brassin';
import type { Recipe } from '@/core/entities/Recipe';
import BeerCard from './BeerCard.vue';

const props = defineProps<{
  items: Brassin[] | Recipe[],
  onItemClick?: (items: any) => void
}>();
</script>

<style lang="scss" scoped>
</style>