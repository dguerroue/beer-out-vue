<template>
  <div class="px-4 py-6 pb-12">
    <h1 class="text-xl font-bold">Ajouter une recette</h1>
    <form class="space-y-6 py-3" @submit.prevent="onSubmitNewRecipe">

      <div>
        <label for="recipeName" class="block text-sm font-medium text-gray-700">Nom</label>

        <input type="text" id="recipeName" placeholder="Dual Ipa" tabindex="1" ref="autoFocusInput"
          v-model="formData.name" class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
      </div>

      <div class="flex flex-col items-start gap-2">
        <label for="recipeImage" class="block text-sm font-medium text-gray-700">Image</label>

        <label for="recipeImage" v-if="imageFileUrl">
          <img :src="imageFileUrl" alt="image uploaded" class="h-[130px]" />
        </label>

        <input type="file" id="recipeImage" tabindex="2" @change="onInputImageChange" accept="image/*" class="w-full" />

      </div>

      <div>
        <label for="recipeType" class="block text-sm font-medium text-gray-900">Type de biere</label>

        <select name="recipeType" id="recipeType" v-model="formData.type" tabindex="3"
          class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
          <option value="">Type</option>
          <option :value="beerType.id" v-for="beerType in beerTypes" :key="beerType.id">{{ beerType.name }}</option>
        </select>
      </div>

      <div>
        <label for="recipeNotes" class="block text-sm font-medium text-gray-700">Notes</label>

        <textarea id="recipeNotes" placeholder="C'était bon" rows="4" tabindex="4" v-model="formData.notes"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"></textarea>
      </div>


      <ButtonPrimary v-if="!isCreateRecipeLoading" type="submit" class="w-full">
        Ajouter
      </ButtonPrimary>
      <ButtonBase v-else>
        Ajouter
        <LoaderSpinner class="size-4" />
      </ButtonBase>

    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCore } from '@/composables/useCore';
import type { BeerType } from '@/core/entities/BeerType';
import type { PostRecipeParams } from '@/core/models/Recipe';
import ButtonPrimary from '../ButtonPrimary.vue';
import { useRecipesStore } from '@/stores/recipesStore';
import ButtonBase from '../ButtonBase.vue';
import LoaderSpinner from '../LoaderSpinner.vue';

const emit = defineEmits(['submit']);

const core = useCore();

const autoFocusInput = ref<HTMLInputElement | null>(null);
const beerTypes = ref<BeerType[]>([]);
const imageFile = ref();
const imageFileUrl = ref<string | null>(null);
const formData = ref({
  name: '',
  notes: '',
  type: '',
});
const isCreateRecipeLoading = ref(false);

onMounted(async () => {
  setTimeout(() => {
    autoFocusInput.value?.focus();
  }, 100);

  beerTypes.value = await core.beerTypesUC.getBeerTypes();
});

function onInputImageChange(event: Event) {
  if (event.target === null) return;
  const file = (event.target as HTMLInputElement).files![0];
  imageFile.value = file;
  imageFileUrl.value = URL.createObjectURL(file);
}

async function onSubmitNewRecipe() {

  isCreateRecipeLoading.value = true;

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

    await core.recipesUC.createRecipe(fd);
  } else {

    await core.recipesUC.createRecipe(data);
  }

  // refresh recipes
  await useRecipesStore().refreshRecipes();

  isCreateRecipeLoading.value = false;

  // purge imageFile
  imageFile.value = null;

  emit('submit');
}
</script>

<style lang="scss" scoped></style>