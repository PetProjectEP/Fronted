<script setup>
  import { ref } from 'vue'
  const apiUrl = 'http://127.0.0.1:3001/posts'
  
  const temp = ref('No data yet')
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => temp.value = data)
    }
  })
</script>

<template>
  <div>
    <h1>Hello from FeedView</h1>
    {{ temp }}
  </div>
</template>

<style scoped>

</style>