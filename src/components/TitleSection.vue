<template>
  <div class="mb-4 flex items-center justify-between">
    <div class="flex items-center">
      <h2 class="text-2xl font-bold leading-none">
        <slot />
      </h2>
      <div v-if="$slots.actions" class="ml-2">
        <slot name="actions" />
      </div>
    </div>
    <slot name="actions-right" />
  </div>
</template>

<script lang="ts" setup>

</script>