<template>
  <div>
    <slot></slot>
    <NavigationBottom />
  </div>
</template>

<script lang="ts" setup>
import NavigationBottom from '@/components/NavigationBottom.vue';
</script>