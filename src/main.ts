import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import core from './plugins/core'

const app = createApp(App)

app.use(createPinia());

app.use(router);
app.use(core);

app.mount('#app')
