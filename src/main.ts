import './assets/index.css';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import App from './App.vue'
import router from './router'

import core from './plugins/core'

// import layouts
import DefaultLayout from './layouts/DefaultLayout.vue'
import OfflineLayout from './layouts/OfflineLayout.vue'

const app = createApp(App)

app.use(createPinia());

// Ajoute les layouts en global, pour pouvoir les utiliser en dynamique
app.component('DefaultLayout', DefaultLayout);
app.component('OfflineLayout', OfflineLayout);

app.use(router);
app.use(core);
app.use(Vue3Toastify);

app.mount('#app')
