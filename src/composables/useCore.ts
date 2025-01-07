import type { Core } from '@/core';
import { inject } from 'vue'

export function useCore() {
  const coreInstance = inject('coreInstance');
  return coreInstance as Core;
}