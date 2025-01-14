<template>
  <ButtonBase @click="handleConfirmClick" :class="{ 'bg-red-500 text-white': confirming }">
    <slot v-if="confirming === false || !$slots['confirm']"></slot>
    <slot name="confirm" v-if="confirming"></slot>
  </ButtonBase>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonBase from './ButtonBase.vue';

const emit = defineEmits(['confirm']);

const confirming = ref(false);
const timeoutId = ref();

function handleConfirmClick() {
  clearTimeout(timeoutId.value);

  if (confirming.value) {
    emit('confirm');
  } else {
    confirming.value = !confirming.value;
  }


  timeoutId.value = setTimeout(() => {
    confirming.value = false;
  }, 3000);
}

</script>

<style lang="scss" scoped></style>