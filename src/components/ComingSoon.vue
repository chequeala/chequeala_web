<template>
  <div class="container text-center p-5">
    <h5 class="card-title">
      <strong>{{ $t('comingSoon.tituloDestacado') }}</strong> {{ $t('comingSoon.titulo') }}
    </h5>
    <p class="card-text px-5">
      {{ $t('comingSoon.descripcion') }}
    </p>
    <img src="@/assets/construction.svg" :alt="$t('comingSoon.altImagen')" />
  </div>
</template>
