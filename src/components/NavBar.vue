<template>
  <nav class="navbar navbar-expand-lg sticky-top site-nav">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold fs-3 me-0" to="/">
        <i class="bi bi-search-heart pe-2 d-inline-block rotate"></i>{{ $t('navbar.brand') }}
      </RouterLink>

      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        :aria-label="$t('navbar.menu')"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav" ref="collapse">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2 py-3 py-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/checklist">{{ $t('home.checkList') }}</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://veni.chequea.la">{{ $t('home.veniOSINT') }}</a>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/principios">{{ $t('home.principles') }}</RouterLink>
          </li>
          <li class="nav-item my-2 my-lg-0 ms-lg-2">
            <div
              class="btn-group btn-group-sm lang-switch"
              role="group"
              :aria-label="$t('navbar.language')"
            >
              <button
                v-for="(name, code) in languages"
                :key="code"
                type="button"
                class="btn"
                :class="code === $i18n.locale ? 'btn-brand' : 'btn-outline-brand'"
                :aria-pressed="code === $i18n.locale"
                :title="$t(`navbar.languages.${code}`)"
                @click="changeLanguage(code)"
              >
                {{ name }}
              </button>
            </div>
          </li>
          <li class="nav-item ms-lg-2">
            <a class="btn btn-brand rounded-pill px-3" :href="`mailto:${CONTACT_EMAIL}`">
              <i class="bi bi-envelope me-1"></i>{{ $t('navbar.contact') }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { Collapse } from 'bootstrap'
import { CONTACT_EMAIL } from '@/config'

export default {
  data() {
    return {
      CONTACT_EMAIL,
      languages: {
        es: 'ES',
        pt: 'PT'
      }
    }
  },
  methods: {
    changeLanguage(code) {
      this.$i18n.locale = code
      localStorage.setItem('locale', code) // Guarda la preferencia en localStorage
      document.documentElement.lang = code
    }
  },
  watch: {
    // Cierra el menú móvil al navegar
    $route() {
      Collapse.getInstance(this.$refs.collapse)?.hide()
    }
  }
}
</script>

<style scoped>
.site-nav {
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.navbar-brand {
  color: var(--vt-blue-deep);
  transition-duration: 0.3s;
}
.navbar-brand i {
  color: var(--vt-purple);
  transition: transform 0.3s ease-in-out;
}
.navbar-brand:hover {
  color: var(--vt-purple);
}
.navbar-brand:hover .rotate {
  transform: rotate(-10deg);
}
.nav-link {
  font-weight: 500;
  color: var(--ink);
}
.nav-link:hover,
.nav-link.router-link-active {
  color: var(--vt-purple-deep);
}
.lang-switch .btn {
  min-width: 2.75rem;
}
</style>
