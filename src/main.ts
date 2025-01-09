import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import core from './plugins/core'

// import layouts
import DefaultLayout from './layouts/DefaultLayout.vue'
import OfflineLayout from './layouts/OfflineLayout.vue'

const app = createApp(App)

app.use(createPinia());

// Ajoute les layouts en global, pour pouvoir les utiliser en dynamique
app.component('default-layout', DefaultLayout);
app.component('offline-layout', OfflineLayout);

app.use(router);
app.use(core);

app.mount('#app')
