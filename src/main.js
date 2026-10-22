// Importaciones de Bootstrap (antes que nuestros estilos para poder sobrescribirlos)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import pt from './locales/pt.json'

const savedLocale = localStorage.getItem('locale') || 'es' // 'es' es el idioma por defecto
document.documentElement.lang = savedLocale

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'es',
  messages: {
    es,
    pt
  }
})

createApp(App).use(router).use(i18n).mount('#app')
