<template>
  <div class="beer-card-wrapper flex w-full flex-col overflow-hidden rounded-md bg-white">
    <img v-if="item.imageUrl" :src="baseUrlImage + item.imageUrl" class="h-[180px] w-auto object-cover py-4" />
    <div v-else class="flex h-[180px] w-full items-center justify-center bg-gray-100 text-yellow-500">
      <IconDroplet size="30" />
    </div>

    <div class="w-full bg-white px-2 py-3 text-left">
      <h3 class="font-medium">{{ item.name }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconDroplet from './icons/IconDroplet.vue';

const baseUrlImage = import.meta.env.VITE_IMAGE_BASE_URL;

defineProps<{
  item: any
}>();
</script>

<style lang="scss" scoped>
.beer-card-wrapper {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>