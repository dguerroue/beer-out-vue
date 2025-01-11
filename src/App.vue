<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue';
import BottomSheetView from '@/components/BottomSheetView.vue';
</script>

<template>
  <BaseLayout>
    <RouterView />
    <BottomSheetView />
  </BaseLayout>
</template>

<style scoped></style>
