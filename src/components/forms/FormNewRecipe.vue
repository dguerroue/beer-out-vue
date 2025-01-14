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
        <label for="recipeImage" class="block text-xs font-medium text-gray-700">Image</label>

        <input type="file" id="recipeImage" tabindex="1" ref="autoFocusInput" @change="onInputImageChange"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />

        <img v-if="imageFile" :src="imageFile" alt="image uploaded" />
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
import type { PostRecipeParams } from '@/core/models/Recipe';

const emit = defineEmits(['submit']);

const core = useCore();

const autoFocusInput = ref<HTMLInputElement | null>(null);
const beerTypes = ref<BeerType[]>([]);
const imageFile = ref();
const formData = ref({
  name: '',
  notes: '',
  type: '',
});

onMounted(async () => {
  setTimeout(() => {
    autoFocusInput.value?.focus();
  }, 100);

  beerTypes.value = await core.beerTypesUC.getBeerTypes();
  console.log('beerTypes', beerTypes.value);
});

function onInputImageChange(event: Event) {
  if (event.target === null) return;
  const file = (event.target as HTMLInputElement).files![0];
  imageFile.value = file;
  console.log('input image change', file);
}

async function onSubmitNewRecipe() {
  console.log('submit new recipe');

  const data: PostRecipeParams = {
    name: formData.value.name,
    notes: formData.value.notes,
    type: [
      formData.value.type
    ],
    // TODO get l'utilisateur connecté
    user: "97tc6vhg25o5n2y"
  }

  if (imageFile.value) {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value as string);
    });
    fd.append("image", new File([imageFile.value], `${formData.value.name}`));

    core.recipesUC.createRecipe(fd);
  } else {
    core.recipesUC.createRecipe(data);
  }

  // purge imageFile
  imageFile.value = null;

  emit('submit');
}
</script>

<style lang="scss" scoped></style>