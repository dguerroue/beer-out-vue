<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  ><path
    d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg>
</template>

<script lang="ts" setup>
// icons: https://iconoir.com
withDefaults(defineProps<{
  size?: string;
}>(), {
  size: '24',
});
</script>

<style lang="scss" scoped></style>