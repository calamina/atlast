import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { tooltip } from './directives/tooltip'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.directive('tooltip', tooltip)

app.mount('#app')
