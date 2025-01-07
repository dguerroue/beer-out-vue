<template>
  <div class="group relative flex items-center justify-center" :style="{ width: size, height: size }">

    <!-- initial state -->
    <span class="absolute" :class="$slots['icon-hover'] ? 'group-hover:opacity-0' : ''">
      <slot name="icon" :size="size"></slot>
    </span>

    <!-- hover state -->
    <span v-if="$slots['icon-hover']" class="absolute cursor-pointer opacity-0 group-hover:opacity-100 group-active:opacity-100">
      <slot name="icon-hover" :size="size"></slot>
    </span>

  </div>
</template>

<script lang="ts" setup>
// https://iconoir.com

withDefaults(defineProps<{
  size?: string;
}>(), {
  size: '24px',
});
</script>