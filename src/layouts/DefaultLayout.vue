<template>
  <div class="flex h-screen flex-col">
    <div class="grow overflow-y-scroll p-4 pt-10">
      <slot></slot>
    </div>
    <NavigationBottom />
  </div>
</template>

<script lang="ts" setup>
import NavigationBottom from '@/components/NavigationBottom.vue';
</script>