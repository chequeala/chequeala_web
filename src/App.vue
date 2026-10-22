<script>
import NavBar from '@/components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  components: { NavBar, MyFooter },
  computed: {
    // Título de la pestaña según la página y el idioma
    pageTitle() {
      const key = `titles.${this.$route.name}`
      const title = this.$te(key) ? this.$t(key) : this.$t('titles.inicio')
      return `chequea.la · ${title}`
    }
  },
  watch: {
    pageTitle: {
      handler(title) {
        document.title = title
      },
      immediate: true
    }
  }
}
</script>

<template>
  <NavBar />
  <main class="container-fluid text-wrap">
    <RouterView />
  </main>
  <MyFooter />
</template>
