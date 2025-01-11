<template>
  <div>
    <BottomSheet v-model:open="bs.isOpen" v-for="bs in bottomSheetStack" :key="bs.id"
      @closed="removeBottomSheet(bs.id)">
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