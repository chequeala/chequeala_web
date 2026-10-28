<script setup>
import { CONTACT_EMAIL } from '@/config'
</script>

<template>
  <footer class="site-footer">
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-md-5">
          <RouterLink class="footer-brand fw-bold fs-4" to="/">
            <i class="bi bi-search-heart pe-2"></i>{{ $t('navbar.brand') }}
          </RouterLink>
          <p class="mt-2 mb-0">{{ $t('navbar.description') }}</p>
        </div>

        <div class="col-6 col-md-3">
          <h2 class="footer-title">{{ $t('footer.explore') }}</h2>
          <ul class="list-unstyled mb-0">
            <li>
              <RouterLink to="/checklist">{{ $t('home.checkList') }}</RouterLink>
            </li>
            <li>
              <a href="https://osint.chequea.la">{{ $t('home.veniOSINT') }}</a>
            </li>
            <li>
              <RouterLink to="/principios">{{ $t('home.principles') }}</RouterLink>
            </li>
          </ul>
        </div>

        <div class="col-6 col-md-4">
          <h2 class="footer-title">{{ $t('footer.contactTitle') }}</h2>
          <p class="mb-3">
            <a :href="`mailto:${CONTACT_EMAIL}`" class="text-break">
              <i class="bi bi-envelope me-1"></i>{{ CONTACT_EMAIL }}
            </a>
          </p>
          <p class="small mb-1">{{ $t('footer.translateText') }}</p>
          <a
            href="https://crowdin.com/project/chequeala"
            class="small"
            target="_blank"
            rel="noopener"
          >
            <i class="bi bi-translate me-1"></i>{{ $t('footer.translateLink') }}
          </a>
        </div>
      </div>

      <hr class="my-4" />

      <p class="text-center small mb-0">
        {{ $t('footer.part1') }} <span class="highlight">{{ $t('footer.highlight') }}</span>
        {{ $t('footer.part2') }} <span class="highlight">{{ $t('footer.highlight') }}</span
        >.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink);
  color: rgba(255, 255, 255, 0.75);
}
.site-footer a {
  color: #fff;
}
.site-footer a:hover {
  color: var(--vt-purple-soft);
}
.footer-brand i,
.highlight {
  color: var(--vt-purple-soft);
  font-weight: 700;
}
.footer-title {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.75rem;
}
li + li {
  margin-top: 0.35rem;
}
hr {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
