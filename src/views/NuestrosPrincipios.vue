<template>
  <div class="container-fluid green-section py-5">
    <div class="container">
      <div class="card">
        <div class="card-body p-md-5">
          <h1 class="bd-title mb-4 display-5 text-center">
            <i class="bi bi-balloon-heart"></i> {{ $t('principios.titulo') }}
          </h1>
          <p class="bd-lead text-muted text-center mb-4">
            {{ $t('principios.introduccion') }}
            <strong>{{ $t('principios.comunidad') }}</strong>
          </p>

          <div class="row mb-5">
            <div class="col-md-6">
              <h2 class="h4 mb-3">{{ $t('principios.quienes_somos.titulo') }}</h2>
              <ul class="list-unstyled">
                <li class="mb-3">
                  <i class="bi bi-shield-lock-fill text-success"></i>
                  <strong>{{ $t('principios.quienes_somos.linea_ayuda') }}</strong>
                  {{ $t('principios.quienes_somos.descripcion') }}
                </li>
                <li class="mb-3">
                  <i class="bi bi-globe text-info"></i>
                  <strong>{{ $t('principios.quienes_somos.enfoque_regional') }}</strong>
                  {{ $t('principios.quienes_somos.enfoque_regional_desc') }}
                </li>
              </ul>
            </div>

            <div class="col-md-6">
              <!-- Placeholder image -->
              <img src="@/assets/team.svg" alt="Placeholder" class="img-fluid" />
            </div>
          </div>

          <h2 class="h4 mb-3">{{ $t('principios.compromiso.titulo') }}</h2>
          <ul class="list-unstyled mb-5">
            <li class="mb-3">
              <i class="bi bi-lock-fill text-warning"></i>
              <strong>{{ $t('principios.compromiso.privacidad') }}</strong>
              {{ $t('principios.compromiso.privacidad_desc') }}
            </li>
            <li class="mb-3">
              <i class="bi bi-database-fill text-danger"></i>
              <strong>{{ $t('principios.compromiso.datos_minimos') }}</strong>
              {{ $t('principios.compromiso.datos_minimos_desc') }}
            </li>
            <li class="mb-3">
              <i class="bi bi-file-earmark-text-fill text-primary"></i>
              <strong>{{ $t('principios.compromiso.responsabilidad_datos') }}</strong>
              {{ $t('principios.compromiso.responsabilidad_datos_desc') }}
            </li>
          </ul>

          <h2 class="h4 mb-3">{{ $t('principios.acciones.titulo') }}</h2>
          <ul class="list-unstyled mb-5">
            <li class="mb-3">
              <i class="bi bi-trash-fill text-danger"></i>
              <strong>{{ $t('principios.acciones.destruccion_datos') }}</strong>
              {{ $t('principios.acciones.destruccion_datos_desc') }}
            </li>
            <li class="mb-3">
              <i class="bi bi-eye-fill text-success"></i>
              <strong>{{ $t('principios.acciones.transparencia') }}</strong>
              {{ $t('principios.acciones.transparencia_desc') }}
            </li>
          </ul>

          <h2 class="h4 mb-3">{{ $t('principios.herramientas_contacto.titulo') }}</h2>
          <p class="bd-lead fw-light">
            {{ $t('principios.herramientas_contacto.descripcion') }}
          </p>
          <ul class="list-unstyled">
            <li class="mb-3">
              <i class="bi bi-chat-dots-fill text-info"></i>
              <strong>{{ $t('principios.herramientas_contacto.why_signal') }}</strong>
              {{ $t('principios.herramientas_contacto.why_signal_desc') }}
            </li>
            <li class="mb-3">
              <i class="bi bi-envelope-fill text-primary"></i>
              <strong>{{ $t('principios.herramientas_contacto.proceso_comunicacion') }}</strong>
              {{ $t('principios.herramientas_contacto.proceso_comunicacion_desc') }}
            </li>
          </ul>

          <blockquote class="blockquote text-center mt-5">
            <p class="font-monospace">"{{ $t('principios.cita') }}"</p>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p,
li {
  font-weight: 300;
}

.card {
  border: none;
  border-radius: 0.75rem;
}

h1 {
  color: #804fdc;
}

i {
  margin-right: 8px;
}
</style>
