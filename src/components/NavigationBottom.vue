<template>
  <div class="navigation-bottom-wrapper flex items-center justify-evenly gap-6 bg-white px-2 py-3">
    <NavigationBottomButton>
      <IconAddSquare size="30" />
      <span class="text-center text-[9px]">Nouveaux brassin</span>
    </NavigationBottomButton>

    <NavigationBottomButton @click="onAddRecipeClick">
      <IconAddSquare size="30" />
      <span class="text-center text-[9px]">Nouvelle recette</span>
    </NavigationBottomButton>

    <NavigationBottomButton @click="onLogoutClick">
      <IconLogout size="30" />
      <span class="text-[9px]">Deconnexion</span>
    </NavigationBottomButton>
  </div>
</template>

<script lang="tsx" setup>
import { useCore } from '@/composables/useCore';
import IconAddSquare from './icons/IconAddSquare.vue';
import IconLogout from './icons/IconLogout.vue';
import NavigationBottomButton from './NavigationBottomButton.vue';
import { useRouter } from 'vue-router';
import { useBottomSheet } from '@/composables/useBottomSheet';
import FormNewRecipe from './forms/FormNewRecipe.vue';

const core = useCore();
const router = useRouter();
const bs = useBottomSheet();

function onAddRecipeClick() {
  const id = bs.openBottomSheet(
    <FormNewRecipe onSubmit={() => { bs.closeBottomSheetById(id) }} />
  );
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