<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container py-1 d-flex align-items-center">
      <div class="text-start">
        <a class="navbar-brand fw-bold fs-3 me-0" href="/">
          <i class="bi bi-search-heart pe-2 d-inline-block rotate"></i>{{ $t('navbar.brand') }}
        </a>
        <form class="form-inline d-inline-flex form-select-xs">
          <select
            class="form-control form-control-sm"
            v-model="selectedLanguage"
            @change="changeLanguage"
          >
            <option v-for="(language, code) in languages" :key="code" :value="code">
              {{ language }}
            </option>
          </select>
        </form>
      </div>
      <span class="navbar-text d-none d-md-block">
        {{ $t('navbar.description') }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      languages: {
        es: 'es',
        pt: 'pt'
      },
      selectedLanguage: this.$i18n.locale // Idioma por defecto
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage
      localStorage.setItem('locale', this.selectedLanguage) // Guarda la preferencia en localStorage
      window.location.reload() // Recarga la página
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
  color: var(--vt-blue);
  text-decoration: none;
  transition-duration: 0.3s;
}
.navbar .navbar-brand i {
  color: var(--vt-purple-soft);
  transition: transform 0.3s ease-in-out;
}

.navbar .navbar-brand:hover {
  color: var(--vt-purple-soft);
}
.navbar .navbar-brand:hover .rotate {
  transition: 0.3s;
  transform: rotate(-10deg);
}

.form-control-sm {
  font-size: 0.6rem; /* Tamaño de fuente pequeño */
  margin: 0; /* Elimina el margen inferior */
}
</style>
