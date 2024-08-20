<script setup>
  import { ref } from 'vue';

  const props = defineProps(['title', 'text'])
  // const title = ref('No title received!');
  // const text = ref('No text received!');
</script>

<template>
  <div class="post-wrapper">
    <h2 class="post-title">{{ title }}</h2>
    <p class="post-text">{{ text }}</p>
  </div>
</template>

<style scoped>
  .post-wrapper {
    border-bottom: 1px solid;
  }

  .post-text {
    font-size: 18px;
  }
</style>