<script>
export default {
  computed: {
    testimonios() {
      return this.$i18n.messages[this.$i18n.locale].testimonios.items
    }
  }
}
</script>

<template>
  <div class="container-fluid green-section">
    <section id="testimonios" class="container" aria-labelledby="testimonios-titulo">
      <h2 id="testimonios-titulo" class="section-title text-center mb-5">
        {{ $t('testimonios.titulo') }}
      </h2>

      <div class="testimonios-track">
        <figure v-for="testimonio in testimonios" :key="testimonio.organizacion" class="card h-100">
          <div class="card-body p-4 d-flex flex-column">
            <i class="bi bi-quote quote-icon" aria-hidden="true"></i>
            <blockquote class="flex-grow-1 mb-3">
              <p class="mb-0">{{ testimonio.mensaje }}</p>
            </blockquote>
            <figcaption class="d-flex justify-content-between align-items-end gap-2">
              <cite class="fw-bold">{{ testimonio.organizacion }}</cite>
              <small class="text-soft text-nowrap">{{ testimonio.fecha }}</small>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  </div>
</template>

<style scoped>
#testimonios {
  padding-top: 4.5rem;
  padding-bottom: 4.5rem;
}
.testimonios-track {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.card {
  margin: 0;
  border: none;
  border-radius: var(--radius);
}
.quote-icon {
  font-size: 2.5rem;
  line-height: 1;
  color: var(--vt-purple-soft);
}
cite {
  font-style: normal;
  color: var(--vt-blue-deep);
}

/* En móvil: carrusel deslizable */
@media (max-width: 767.98px) {
  .testimonios-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
  }
  .testimonios-track > .card {
    flex: 0 0 85%;
    scroll-snap-align: start;
  }
}
</style>
