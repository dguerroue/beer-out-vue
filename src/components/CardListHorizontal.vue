<template>
  <div class="flex flex-col gap-10">
    <div class="vanilla-slider scrollbar-hide flex w-full flex-row items-stretch gap-3 overflow-x-auto p-2 *:flex-none">
      <div
        v-for="item in fiveFirstItems"
        :key="item.id"
        class="w-[var(--child-width)] cursor-pointer transition-transform hover:scale-105 active:scale-95"
        @click="onItemClick && onItemClick(item)"
      >
        <BeerCard :item="item" class="h-full" />
      </div>

      <div
        v-if="items.length > 5"
        class="flex w-[var(--child-width)] items-center justify-center px-2 text-center font-bold text-cyan-700"
      >
        {{ seemoreLabel }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Brassin } from '@/core/entities/Brassin';
import type { Recipe } from '@/core/entities/Recipe';
import BeerCard from './BeerCard.vue';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  seemoreLabel?: string,
  items: Brassin[] | Recipe[],
  onItemClick?: (items: any) => void
}>(), {
  seemoreLabel: 'Voir plus'
});

const fiveFirstItems = computed(() => props.items.slice(0, 5));
</script>

<style lang="scss" scoped>
.vanilla-slider {
  // show approx 1.2 elem
  --child-width: calc((100%/1) - 25px);
  
  // show approx 2.2 elem 
  @media (min-width: 300px) {
    --child-width: calc((100%/2.2) - 9px); 
  }

  // show approx 3.2 elem
  @media (min-width: 480px) {
    --child-width: calc((100%/3.2) - 8px);
  }

  // show approx 4.2 elem
  @media (min-width: 768px) {
    --child-width: calc((100%/4.2) - 8px);
  }

  // show approx 9 elem
  @media (min-width: 1024px) {
    --child-width: calc((100%/6));
  }
}
</style>