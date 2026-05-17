import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './config/i18n'

// CSS import order matters:
// 1. Our tokens (no dependencies)
import '@/assets/styles/variables.css'
// 2. Bootstrap (consumes nothing from us yet)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
// 3. Global base + Bootstrap overrides (reads our tokens + overrides Bootstrap vars)
import '@/assets/styles/fonts.css'
import '@/assets/styles/global.css'
import { vReveal } from '@/directives/reveal'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.directive('reveal', vReveal)

app.mount('#app')
