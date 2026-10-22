<script setup>
import NavBar from '@/components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
</script>

<template>
  <NavBar />
  <main class="container-fluid text-wrap">
    <RouterView />
  </main>
  <MyFooter />
</template>
