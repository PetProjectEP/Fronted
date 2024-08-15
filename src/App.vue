<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue'
  
</script>

<template>
  <NavBar />
  <div>
    <RouterView />
  </div>
</template>

<style scoped>

</style>