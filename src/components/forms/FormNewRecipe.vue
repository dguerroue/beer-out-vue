<template>
  <div class="px-4 py-6 pb-12">
    <h1 class="text-xl font-bold">Ajouter une recette</h1>
    <form class="space-y-6 py-3" @submit.prevent="onSubmitNewRecipe">

      <div>
        <label for="recipeName" class="block text-xs font-medium text-gray-700">Nom</label>

        <input type="text" id="recipeName" placeholder="Dual Ipa" tabindex="1" ref="autoFocusInput"
          v-model="formData.name" class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
      </div>

      <div>
        <label for="recipeType" class="block text-sm font-medium text-gray-900">Type de biere</label>

        <select name="recipeType" id="recipeType" v-model="formData.type" tabindex="2"
          class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
          <option value="">Type</option>
          <option :value="beerType.id" v-for="beerType in beerTypes" :key="beerType.id">{{ beerType.name }}</option>
        </select>
      </div>

      <div>
        <label for="recipeNotes" class="block text-xs font-medium text-gray-700">Notes</label>

        <textarea id="recipeNotes" placeholder="C'était bon" rows="4" tabindex="3" v-model="formData.notes"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"></textarea>
      </div>

      <ButtonBase type="submit" class="w-full">
        Ajouter
      </ButtonBase>

    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ButtonBase from '../ButtonBase.vue';
import { useCore } from '@/composables/useCore';
import type { BeerType } from '@/core/entities/BeerType';

const emit = defineEmits(['submit']);

const core = useCore();

const autoFocusInput = ref<HTMLInputElement | null>(null);
const beerTypes = ref<BeerType[]>([]);
const formData = ref({
  name: '',
  notes: '',
  type: ''
});

onMounted(async () => {
  setTimeout(() => {
    autoFocusInput.value?.focus();
  }, 100);

  beerTypes.value = await core.beerTypesUC.getBeerTypes();
  console.log('beerTypes', beerTypes.value);
});

async function onSubmitNewRecipe() {
  console.log('submit new recipe');

  const data = {
    id: undefined,
    imageUrl: undefined,
    name: formData.value.name,
    notes: formData.value.notes,
    type: [
      formData.value.type
    ],
    // TODO get l'utilisateur connecté
    user: "97tc6vhg25o5n2y"
  }

  core.recipesUC.createRecipe({
    ...data
  });

  emit('submit');
}
</script>

<style lang="scss" scoped></style>