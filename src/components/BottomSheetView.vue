<template>
  <div>
    <BottomSheet
      v-for="bs in bottomSheetStack"
      :key="bs.id"
      v-model:open="bs.isOpen"
    >
      <component :is="bs.component" />
    </BottomSheet>
  </div>
</template>

<script lang="ts" setup>
import BottomSheet from '@/components/BottomSheet.vue';
import { useBottomSheet } from '@/composables/useBottomSheet';

const { bottomSheetStack, removeBottomSheet } = useBottomSheet();

</script>

<style lang="scss" scoped></style>