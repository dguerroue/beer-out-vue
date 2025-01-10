<template>
  <svg :width="size" :height="size" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" color="#000000">
    <path d="M15 6L9 12L15 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    </path>
  </svg>
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