import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type BrassinsUsecases from '../usecases/brassinsUC';
import type { BrassinsGetParams } from '../models/Brassin';
import type { Brassin } from '../entities/Brassin';

export function createBrassinsStore(brassinsUsecases: BrassinsUsecases) {
  return defineStore('brassins', () => {
    const brassins = ref<Brassin[]>([]);
    const isBrassinsLoading = ref<boolean>(false);
  
    async function getBrassins(force: boolean = false, params?: BrassinsGetParams): Promise<Ref<Brassin[]>> {
  
      if (force || brassins.value.length === 0) {
        isBrassinsLoading.value = true;
        // await new Promise(resolve => setTimeout(resolve, 2000));
        brassins.value = await brassinsUsecases.getBrassins(params);
        isBrassinsLoading.value = false;
        return brassins;
      } else {
        return brassins;
      }
  
    }

    async function getBrassinById(id: string, params?: any): Promise<Brassin> {
      return await brassinsUsecases.getBrassinById(id, params);
    }
  
    return {
      brassins,
      isBrassinsLoading,
      getBrassins,
      getBrassinById
    }
  });

};

