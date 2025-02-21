<template>
  <div class="group flex cursor-pointer items-center gap-1" @click="router.back()">
    <IconLeftArrow size="25" class="transition-transform group-hover:-translate-x-1" />
    <span v-if="label" class="font-medium">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import IconLeftArrow from './icons/IconLeftArrow.vue';

defineProps<{
  label?: string;
}>();
</script>

<style lang="scss" scoped></style>