<template>
  <div class="navigation-bottom-wrapper mx-auto mb-2 flex w-11/12 items-center justify-evenly gap-6 rounded-2xl bg-white px-2 py-3">
    <NavigationBottomButton @click="onHomeClick">
      <div class="group flex flex-col items-center">
        <IconHome size="30" />
        <span class="text-center text-[9px]">Accueil</span>
      </div>
    </NavigationBottomButton>

    <!-- <NavigationBottomButton>
      <div class="group flex flex-col items-center">
        <IconAddSquare size="30" />
        <span class="text-center text-[9px]">Nouveaux brassin</span>
      </div>
    </NavigationBottomButton> -->

    <NavigationBottomButton @click="onAddRecipeClick">
      <div class="group flex flex-col items-center">
        <IconAddSquare size="30" />
        <span class="text-center text-[9px]">Nouvelle recette</span>
      </div>
    </NavigationBottomButton>

    <NavigationBottomButton @click="onLogoutClick">
      <IconLogout size="30" />
      <span class="text-[9px]">Deconnexion</span>
    </NavigationBottomButton>
  </div>
</template>

<script lang="ts" setup>
import { useCore } from '@/composables/useCore';
import IconAddSquare from './icons/IconAddSquare.vue';
import IconLogout from './icons/IconLogout.vue';
import NavigationBottomButton from './NavigationBottomButton.vue';
import { useRouter } from 'vue-router';
import { useRecipesActions } from '@/composables/useRecipesActions';
import IconAddSquareSolid from './icons/IconAddSquareSolid.vue';
import ButtonIcon from './ButtonIcon.vue';
import IconHome from './icons/IconHome.vue';

const core = useCore();
const router = useRouter();

const recipesActions = useRecipesActions();

function onHomeClick() {
  router.push({
    path: '/'
  });
}

function onAddRecipeClick() {
  recipesActions.openBsFormNewRecipe();
}

async function onLogoutClick() {
  await core.authUC.logout();

  router.push({
    path: 'login'
  });
} 
</script>

<style lang="scss" scoped>
.navigation-bottom-wrapper {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>