<script setup>
import SectionTestimonios from '@/components/home/SectionTestimonios.vue'
import PreguntasFrecuentes from '@/components/home/PreguntasFrecuentes.vue'
</script>

<template>
  <div class="container-fluid green-section pb-3">
    <header class="container pb-5">
      <div class="row">
        <div class="col-md-6 d-flex align-items-end pb-5 mb-5">
          <div>
            <h2>{{ $t('home.headerTitle') }}</h2>
            <p class="fw-light">
              {{ $t('home.headerDescription1') }}
              <br />
              {{ $t('home.headerDescription2') }}
            </p>
            <a
              class="btn btn-primary text-white rounded-5 px-4 py-2"
              :href="$t('home.signalLink')"
              role="button"
              >{{ $t('home.signalButtonText') }}<i class="bi bi-signal ms-2"></i
            ></a>
          </div>
        </div>
        <div class="col-md-6">
          <img
            class="img-fluid mt-2"
            src="@/assets/error-web.svg"
            alt="Línea de ayuda chequea.la"
          />
        </div>
      </div>
      <div class="row gy-4 mt-5 text-center fs-1 fw-bold">
        <div class="col-xl-3 col-md-6">
          <div class="card py-5">
            <div class="card-body">
              <i class="bi bi-list-check"></i>
              <h4>
                <a href="/checklist" class="stretched-link">{{ $t('home.checkList') }}</a>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card py-5">
            <div class="card-body">
              <i class="bi bi-diagram-3"></i>
              <h4>
                <a href="https://veni.chequea.la" class="stretched-link">{{
                  $t('home.veniOSINT')
                }}</a>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card py-5">
            <div class="card-body">
              <i class="bi bi-collection"></i>
              <h4>
                <a href="/recursos" class="stretched-link">{{ $t('home.resources') }}</a>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card py-5">
            <div class="card-body">
              <i class="bi bi-balloon-heart"></i>
              <h4>
                <a href="/principios" class="stretched-link">{{ $t('home.principles') }}</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
  <div class="container-fluid py-5">
    <PreguntasFrecuentes />
  </div>
  <SectionTestimonios />
</template>

<style scoped>
header .card .card-body i {
  /* color: #b288ff; */
  color: var(--vt-purple-soft);
  font-weight: bold;
}
header .card .card-body h4 {
  margin-top: 1rem;
}
header .card .card-body a {
  text-decoration: none;
  font-weight: 500;
  color: #212529;
}
header .card a:hover {
  color: #fff;
}
header .card:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition-duration: 1s;
  background-color: var(--vt-blue);
  color: #fff;
}
header .card:hover > .card-body i {
  transition-duration: 1s;
  color: #fff;
}
</style>
