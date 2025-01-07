<template>
  <div class="flex flex-col gap-10">

    <div class="grid grid-cols-2 gap-3">
      <div v-for="slide in 4" :key="slide" class="w-[var(--child-width)]">
        <BeerCard />
      </div>
      <div class="col-span-2 my-6 px-2 text-center font-bold text-cyan-700">
        Voir tout les brassins
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import BeerCard from './BeerCard.vue';
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