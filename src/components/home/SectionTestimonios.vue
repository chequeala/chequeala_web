<script>
export default {
  computed: {
    testimonios() {
      return this.$i18n.messages[this.$i18n.locale].testimonios.items
    }
  },
  methods: {
    // Esta función divide el array de testimonios en grupos de tres
    dividirEnGrupos(arr, tamañoGrupo) {
      let grupos = []
      for (let i = 0; i < arr.length; i += tamañoGrupo) {
        grupos.push(arr.slice(i, i + tamañoGrupo))
      }
      return grupos
    }
  }
}
</script>

<template>
  <div class="container-fluid green-section pt-5 pb-3">
    <section id="testimonios" class="container">
      <h3 class="text-center mb-4">{{ $t('testimonios.titulo') }}</h3>

      <div id="carouselExample" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div
            v-for="(grupo, index) in dividirEnGrupos(testimonios, 3)"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <div class="row row-cols-1 row-cols-md-3 g-5">
              <div v-for="(testimonio, i) in grupo" :key="i" class="col">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">{{ testimonio.organizacion }}</h5>
                    <figure class="card-text">
                      <blockquote>
                        <p>{{ testimonio.mensaje }}</p>
                      </blockquote>
                      <figcaption class="blockquote-footer text-end">
                        <cite title="Source Title">{{ testimonio.autor }}</cite>
                      </figcaption>
                    </figure>
                  </div>
                  <div class="card-footer text-end">
                    <small class="text-body-secondary">{{ testimonio.fecha }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button
          class="btn mt-1"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <i class="bi bi-arrow-left-short"></i>
          <span class="visually-hidden">{{ $t('testimonios.anterior') }}</span>
        </button>
        <button
          class="btn mt-1"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <i class="bi bi-arrow-right-short"></i>
          <span class="visually-hidden">{{ $t('testimonios.siguiente') }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
#testimonios .card-title {
  color: var(--vt-blue);
}
#testimonios button {
  color: var(--vt-purple);
}
#testimonios button:hover {
  color: var(--vt-purple-soft);
}
</style>
