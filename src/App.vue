<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="px-2 py-4">
    <RouterView />
    <RouterView name="NavigationBottom" />
  </div>
</template>

<style scoped>
</style>
