<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container py-1">
      <a class="navbar-brand fw-bold fs-3" href="/"
        ><i class="bi bi-search-heart pe-2"></i>Chequea.la</a
      >
      <span class="navbar-text d-flex d-none d-md-block"
        >Atendemos incidentes web de organizaciones en Latinoamérica.</span
      >
      <form class="form-inline my-2 my-lg-0">
        <select class="form-control" v-model="selectedLanguage" @change="changeLanguage">
          <option v-for="(language, code) in languages" :key="code" :value="code">
            {{ language }}
          </option>
        </select>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      languages: {
        es: 'Español',
        pt: 'Português',
        en: 'English'
      },
      selectedLanguage: 'es' // Idioma por defecto
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage
    }
  },
  mounted() {
    // Establecer el idioma seleccionado al idioma actual
    this.selectedLanguage = this.$i18n.locale
  }
}
</script>

<style scoped>
.navbar {
  background-color: #fff;
}
.navbar .navbar-brand {
  /* color: #86a5d9; */
  color: var(--vt-blue);
}
.navbar .navbar-brand i {
  /* color: #b288ff; */
  color: var(--vt-purple-soft);
}
</style>
