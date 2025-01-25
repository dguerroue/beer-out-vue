<template>
  <form
    class="space-y-6 py-3"
    @submit.prevent="onSubmitEditRecipe"
  >
    <div>
      <label
        for="recipeName"
        class="block text-sm font-medium text-gray-700"
      >Nom</label>

      <input
        id="recipeName"
        v-model="formData.name"
        type="text"
        placeholder="Dual Ipa"
        tabindex="1"
        class="input-custom"
      >
    </div>

    <div class="flex flex-col items-start gap-2">
      <label
        for="recipeImage"
        class="block text-sm font-medium text-gray-700"
      >Image</label>

      <label
        v-if="imageFileUrl || recipe.imageUrl"
        for="recipeImage"
      >
        <img
          :src="imageFileUrl || baseUrlImage + recipe.imageUrl"
          alt="image uploaded"
          class="h-[130px]"
        >
      </label>

      <input
        id="recipeImage"
        type="file"
        tabindex="2"
        accept="image/*"
        class="w-full"
        @change="onInputImageChange"
      >
    </div>

    <div>
      <label for="recipeType" class="block text-sm font-medium text-gray-900">
        Type de biere (multi)
      </label>

      <Multiselect
        id="recipeType"
        v-model="formData.type"
        tag-placeholder="Ajouter le type"
        placeholder="Rechercher ou ajouter un type"
        class="input-custom"
        label="name"
        track-by="id"
        :options="beerTypes"
        :multiple="true"
        :taggable="true"
        @tag="onAddBeerType"
        @update:model-value="() => {/*DEBUG :*/ console.log(JSON.stringify(formData.type))}"
      />
    </div>

    <div>
      <label for="recipeNotes" class="test block text-sm font-medium text-gray-700">Notes</label>

      <textarea
        id="recipeNotes"
        v-model="formData.notes"
        placeholder="C'était bon"
        rows="4"
        tabindex="4"
        class="input-custom"
      />
    </div>


    <div>
      <ButtonPrimary v-if="!isCreateRecipeLoading" type="submit" class="w-full">
        Modifier
      </ButtonPrimary>
      <ButtonBase v-else disabled class="w-full">
        Modifier
        <LoaderSpinner class="size-4" />
      </ButtonBase>
      <ButtonBase class="mt-3 w-full" @click="onCancelClick">
        Annuler
      </ButtonBase>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCore } from '@/composables/useCore';
import type { BeerType } from '@/core/entities/BeerType';
import type { RecipePostParams } from '@/core/models/Recipe';
import ButtonPrimary from '../ButtonPrimary.vue';
import ButtonBase from '../ButtonBase.vue';
import LoaderSpinner from '../LoaderSpinner.vue';

import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import type { Recipe } from '@/core/entities/Recipe';

const emit = defineEmits(['submit', 'cancel']);

const props = defineProps<{
  recipe: Recipe;
}>();

const baseUrlImage = import.meta.env.VITE_IMAGE_BASE_URL;

const core = useCore();
const recipesStore = core.recipesStore();

const imageFile = ref();
const imageFileUrl = ref<string | null>(null);
const formData = ref<{
  name: string;
  notes: string;
  type: BeerType[];
}>({
  name: props.recipe.name,
  notes: props.recipe.notes,
  type: props.recipe.type,
});
const beerTypes = ref<BeerType[]>([]);
const isCreateRecipeLoading = ref(false);

onMounted(async () => {
  beerTypes.value = await core.beerTypesUC.getBeerTypes();
});

function onInputImageChange(event: Event) {
  if (event.target === null) return;
  const file = (event.target as HTMLInputElement).files![0];
  imageFile.value = file;
  imageFileUrl.value = URL.createObjectURL(file);
}

async function onAddBeerType(newBeerName: string) {
  // push new beer type to database
  const respNewBeer = await core.beerTypesUC.createBeerType(newBeerName);

  const newBeerType = {
    name: newBeerName,
    id: respNewBeer.id
  }

  beerTypes.value.push(newBeerType);
  formData.value.type.push(newBeerType);
}

async function onSubmitEditRecipe() {

  isCreateRecipeLoading.value = true;

  const data: RecipePostParams = {
    name: formData.value.name,
    notes: formData.value.notes,
    type: formData.value.type.map(beerType => beerType.id),
    // TODO get l'utilisateur connecté
    user: "97tc6vhg25o5n2y"
  }

  if(!props.recipe.id) {
    console.error('Recipe id is missing');
    return;
  }
  try {
    if(imageFile.value) {
      const fd = new FormData();
  
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => fd.append(key, val));
        } else {
          fd.append(key, value as string);
        }
      });
      fd.append("image", new File([imageFile.value], `${formData.value.name}`));
  
      await recipesStore.editRecipe(props.recipe.id, fd);
    } else {
      await recipesStore.editRecipe(props.recipe.id, data);
    }
  
    // refresh recipes
    await recipesStore.refreshRecipes();

  } catch(e) {
    // console.error(e);
  } finally {
    isCreateRecipeLoading.value = false;
  }

  // purge imageFile
  imageFile.value = null;

  emit('submit');
}

function onCancelClick() {
  emit('cancel');
}
</script>

<style lang="scss" scoped>
.input-custom {
  @apply mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm;
}
</style>