// // Importaciones de Bootstrap
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import { createPinia } from 'pinia'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import pt from './locales/pt.json'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'

const i18n = createI18n({
  locale: 'es', // Establece el idioma predeterminado
  fallbackLocale: 'es',
  messages: {
    es,
    pt
  }
})

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')
