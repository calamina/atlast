import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import { tooltip } from './directives/tooltip'
import { inactive } from './directives/inactive'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.directive('tooltip', tooltip)
app.directive('inactive', inactive)

app.mount('#app')
