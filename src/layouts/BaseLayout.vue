<template>
  <component :is="layout" :data-layout="layout">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => (route.meta.layout || 'default') + '-layout')
</script>