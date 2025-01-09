<template>
  <div class="flex flex-col gap-10">

    <div class="vanilla-slider scrollbar-hide flex w-full flex-row gap-3 overflow-x-auto p-2 *:flex-none">
      <div v-for="brassin in fiveFirstBrassins" :key="brassin.id" class="w-[var(--child-width)]">
        <BeerCard :brassin="brassin" />
      </div>
      <div v-if="brassins.length > 5"
        class="flex w-[var(--child-width)] items-center justify-center px-2 text-center font-bold text-cyan-700">
        {{ seemoreLabel }}
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { Brassin } from '@/core/models/Brassin';
import BeerCard from './BeerCard.vue';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  seemoreLabel?: string,
  brassins: Brassin[]
}>(), {
  seemoreLabel: 'Voir plus'
});

const fiveFirstBrassins = computed(() => props.brassins.slice(0, 5));
</script>

<style lang="scss" scoped>
.vanilla-slider {
  --child-width: calc((100%/2.5) - 12px); // = approx 2.5 elem shown

  @media (min-width: 424px) {
    --child-width: calc((100%/3.5) - 12px); // = approx 3.5 elem shown
  }

  @media (min-width: 768px) {
    --child-width: calc((100%/4.5) - 12px); // = approx 4.5 elem shown
  }

  @media (min-width: 1024px) {
    --child-width: calc((100%/6)); // = approx 6 elem shown
  }
}
</style>