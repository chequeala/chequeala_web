<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
</script>

<template>
  <!-- <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </header> -->

  <div class="container-fluid">
    <NavBar />
    <RouterView />
    <MyFooter />
  </div>
</template>

<style scoped></style>
