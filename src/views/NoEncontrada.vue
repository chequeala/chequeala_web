<template>
  <div class="container-fluid green-section">
    <div class="container text-center py-5">
      <img src="@/assets/error-web.svg" alt="" class="img-fluid my-4" width="420" />
      <h1 class="h2">{{ $t('notFound.titulo') }}</h1>
      <p class="text-soft">{{ $t('notFound.descripcion') }}</p>
      <RouterLink to="/" class="btn btn-brand rounded-pill px-4 mt-2">
        <i class="bi bi-arrow-left me-2"></i>{{ $t('notFound.volver') }}
      </RouterLink>
    </div>
  </div>
</template>
