<template>
  <div>
    <Swiper :modules="[FreeMode]" :free-mode="true" :slides-per-view="2.5" :space-between="8">
      <SwiperSlide v-for="slide in 12" :key="slide">
        <BeerCard />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import BeerCard from './BeerCard.vue';
import type { SwiperOptions } from 'swiper/types';
import { FreeMode } from 'swiper/modules';

const swiperConfig: SwiperOptions = {
  modules: [FreeMode],
  freeMode: true,
}
</script>

<style lang="scss" scoped></style>