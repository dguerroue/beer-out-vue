<script setup lang="ts">
import NavigationButtonGoBack from '@/components/NavigationButtonGoBack.vue';
import ButtonIconAdd from '@/components/ButtonIconAdd.vue';
import CardList from '@/components/CardList.vue';
import TitleSection from '@/components/TitleSection.vue';
import { useRecipesActions } from '@/composables/useRecipesActions';
import { useRecipesStore } from '@/composables/useRecipesStore';
import type { Recipe } from '@/core/entities/Recipe';
import router from '@/router';
import { storeToRefs } from 'pinia';

const recipesStore = useRecipesStore();
const recipesActions = useRecipesActions();

const { recipes, isRecipesLoading } = storeToRefs(recipesStore);

function onAddRecipeClick() {
  recipesActions.openBsFormNewRecipe()
}

function onRecipeClick(recipe: Recipe) {
  router.push({
    path: `/recipe/${recipe.id}`
  });
}
</script>

<template>
  <div>
    <NavigationButtonGoBack label="Retour" />

    <TitleSection>
      Mes recettes
      <template #actions>
        <ButtonIconAdd size="30" @click="onAddRecipeClick()" />
      </template>
    </TitleSection>
    <CardList :items="recipes" @item-click="onRecipeClick" />
  </div>
</template>