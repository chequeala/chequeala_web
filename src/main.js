// // Importaciones de Bootstrap
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import pt from './locales/pt.json'

const savedLocale = localStorage.getItem('locale') || 'es' // 'es' es el idioma por defecto

const i18n = createI18n({
  // locale: 'es',
  locale: savedLocale,
  fallbackLocale: 'es',
  messages: {
    es,
    pt
  }
})

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')
