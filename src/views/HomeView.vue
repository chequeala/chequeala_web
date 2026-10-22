<script setup>
import { ref } from 'vue'
import SectionTestimonios from '@/components/home/SectionTestimonios.vue'
import PreguntasFrecuentes from '@/components/home/PreguntasFrecuentes.vue'
import { CONTACT_EMAIL } from '@/config'

const copiado = ref(false)

async function copiarCorreo() {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
    copiado.value = true
    setTimeout(() => (copiado.value = false), 2000)
  } catch {
    // Sin acceso al portapapeles: el correo sigue visible para copiarlo a mano
  }
}

const servicios = [
  { icon: 'bi-list-check', title: 'home.checkList', desc: 'home.checkListDesc', to: '/checklist' },
  {
    icon: 'bi-diagram-3',
    title: 'home.veniOSINT',
    desc: 'home.veniDesc',
    href: 'https://veni.chequea.la'
  },
  {
    icon: 'bi-balloon-heart',
    title: 'home.principles',
    desc: 'home.principlesDesc',
    to: '/principios'
  },
  {
    icon: 'bi-collection',
    title: 'home.resources',
    desc: 'home.resourcesDesc',
    to: '/recursos',
    proximamente: true
  }
]

const pasos = ['step1', 'step2', 'step3']
</script>

<template>
  <div class="container-fluid green-section">
    <header class="container hero">
      <div class="row align-items-center g-4 g-lg-5">
        <div class="col-lg-6">
          <span class="eyebrow mb-3">{{ $t('home.eyebrow') }}</span>
          <h1 class="hero-title">{{ $t('home.headerTitle') }}</h1>
          <p class="lead fw-semibold mt-3">{{ $t('home.headerDescription1') }}</p>
          <p class="text-soft">{{ $t('home.headerDescription2') }}</p>

          <div class="d-flex flex-wrap align-items-center gap-3 mt-4">
            <a
              class="btn btn-brand btn-lg rounded-pill px-4"
              :href="`mailto:${CONTACT_EMAIL}`"
              role="button"
              >{{ $t('home.contactButtonText') }}<i class="bi bi-envelope ms-2"></i
            ></a>
          </div>
          <p class="small text-soft mt-3 mb-0 d-flex flex-wrap align-items-center gap-2">
            {{ $t('home.orWriteTo') }}
            <strong class="email">{{ CONTACT_EMAIL }}</strong>
            <button
              type="button"
              class="btn btn-sm btn-outline-brand rounded-pill py-0"
              @click="copiarCorreo"
            >
              <i :class="copiado ? 'bi bi-check2' : 'bi bi-copy'" class="me-1"></i>
              {{ copiado ? $t('home.copied') : $t('home.copyEmail') }}
            </button>
          </p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid" src="@/assets/error-web.svg" alt="" width="866" height="683" />
        </div>
      </div>
    </header>
  </div>

  <section class="container section" aria-labelledby="servicios-titulo">
    <h2 id="servicios-titulo" class="section-title text-center mb-4">
      {{ $t('home.servicesTitle') }}
    </h2>
    <div class="row g-4">
      <div v-for="s in servicios" :key="s.title" class="col-md-6 col-xl-3">
        <div class="card service-card h-100" :class="{ 'is-soon': s.proximamente }">
          <div class="card-body p-4">
            <span class="service-icon"><i class="bi" :class="s.icon"></i></span>
            <h3 class="h5 mt-3 mb-2">
              <RouterLink v-if="s.to" :to="s.to" class="stretched-link">{{
                $t(s.title)
              }}</RouterLink>
              <a v-else :href="s.href" class="stretched-link">{{ $t(s.title) }}</a>
              <span v-if="s.proximamente" class="badge rounded-pill ms-2">{{
                $t('home.comingSoon')
              }}</span>
            </h3>
            <p class="text-soft mb-0">{{ $t(s.desc) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container-fluid green-section" aria-labelledby="pasos-titulo">
    <div class="container section">
      <h2 id="pasos-titulo" class="section-title text-center mb-5">{{ $t('home.stepsTitle') }}</h2>
      <ol class="row g-4 list-unstyled steps mb-0">
        <li v-for="(paso, i) in pasos" :key="paso" class="col-md-4">
          <div class="step h-100">
            <span class="step-number">{{ i + 1 }}</span>
            <h3 class="h5 mt-3">{{ $t(`home.${paso}Title`) }}</h3>
            <p class="text-soft mb-0">{{ $t(`home.${paso}Desc`) }}</p>
          </div>
        </li>
      </ol>
      <div class="text-center mt-5">
        <a class="btn btn-brand rounded-pill px-4" :href="`mailto:${CONTACT_EMAIL}`">
          {{ $t('home.contactButtonText') }}<i class="bi bi-envelope ms-2"></i>
        </a>
      </div>
    </div>
  </section>

  <div class="container-fluid section">
    <PreguntasFrecuentes />
  </div>
  <SectionTestimonios />
</template>

<style scoped>
.hero {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
.hero-title {
  font-size: clamp(2.2rem, 1.5rem + 3vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
}
.email {
  color: var(--ink);
}
.section {
  padding-top: 4.5rem;
  padding-bottom: 4.5rem;
}

.service-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
}
.service-card:hover,
.service-card:focus-within {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--vt-purple-soft);
}
.service-card a {
  color: var(--ink);
}
.service-card:hover a {
  color: var(--vt-purple-deep);
}
.service-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  font-size: 1.5rem;
  color: var(--vt-purple-deep);
  background: var(--vt-purple-tint);
}
.service-card.is-soon {
  background: var(--vt-green);
}
.badge {
  font-size: 0.65rem;
  font-weight: 600;
  vertical-align: middle;
  color: var(--vt-blue-deep);
  background: #e3ebf8;
}

.step {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 1.75rem;
}
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-weight: 700;
  color: #fff;
  background: var(--vt-purple);
}
</style>
