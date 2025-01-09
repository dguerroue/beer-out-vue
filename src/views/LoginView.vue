<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto" src="@/assets/logo/logo-xl.png" alt="Your Company" />
      <h2 class="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Connexion</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-5" @submit.prevent="onSubmitLogin">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Adresse Email</label>
          <div class="mt-2">
            <input type="email" v-model="formData.email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input type="password" v-model="formData.password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
          <!-- <div class="mt-1 text-right">
            <a href="#" class=" text-sm text-primary-600 hover:text-primary-500">Mot de passe oublié ?</a>
          </div> -->
        </div>

        <div>
          <ButtonPrimary type="submit" class="w-full">Se connecter</ButtonPrimary>
        </div>

      </form>

      <div v-if="error">
        <div class="my-4 font-bold text-red-600">
          error: {{ error }}
        </div>
      </div>

      <template v-if="false">
        <!-- TODO: Add google or github login -->
        <div class="my-6 flex items-center justify-between">
          <span class="block h-px flex-1 bg-gray-200"></span>
          <span class="mx-4 text-gray-500">ou</span>
          <span class="block h-px flex-1 bg-gray-200"></span>
        </div>
  
        <ButtonBase>GOOGLE</ButtonBase>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonBase from '@/components/ButtonBase.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import { useCore } from '@/composables/useCore';
import router from '@/router';
import { ref } from 'vue';

const core = useCore();

const formData = ref({
  email: '',
  password: '',
});
const error = ref('');

async function onSubmitLogin(event: SubmitEvent) {
  error.value = '';

  try {
    const authResponse = await core.authUC.authWithEmailAndPassword(formData.value.email, formData.value.password);
    router.push(router.currentRoute.value.query.redirect as string || '/');

  } catch(e: any) {
    console.error(e);
    error.value = e.message;
  }
}
</script>

<style lang="scss" scoped></style>