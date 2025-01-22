<template>
  <div>
    <TitleSection>
      Mon brassin
    </TitleSection>

    <ButtonGoBack label="Retour" />

    <div class="mt-8 flex gap-4 px-2">
      <img :src="brassin?.imageUrl" :alt="`Image du brassin ${brassin?.name}`" class="size-24">

      <div class="flex flex-col">
        <h2 class="text-lg font-bold text-gray-800">
          {{ brassin?.name }}
        </h2>

        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="beerType in brassin?.type"
            :key="beerType.id"
            class="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium"
          >
            {{ beerType }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-10" v-html="brassin?.notes" />
  </div>
</template>

<script lang="ts" setup>
import ButtonGoBack from '@/components/ButtonGoBack.vue';
import TitleSection from '@/components/TitleSection.vue';
import { useCore } from '@/composables/useCore';
import type { Brassin } from '@/core/entities/Brassin';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const core = useCore();
const router = useRouter();

const brassinId = String(useRoute().params.id);
const brassin = ref<Brassin>();
const brassinIsLoading = ref(true);

onMounted(async () => {
  try {
    brassinIsLoading.value = true;
    brassin.value = await core.brassinUC.getBrassin(brassinId);
  } catch (error) {
    console.error(error);
  } finally {
    brassinIsLoading.value = false;
  }
})
</script>

<style lang="scss" scoped></style>