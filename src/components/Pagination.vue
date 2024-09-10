<script setup>
  const emits = defineEmits(['goBack', 'goNext'])
  const props = defineProps(['canGoBack', 'canGoNext'])
</script>

<template>
  <div class="pagination-container">
    <button class="prev-button" v-if="canGoBack" @click="$emit('goBack')"><< Back</button>
    <button class="next-button" v-if="canGoNext" @click="$emit('goNext')">Give me more! >></button>
  </div>
</template>

<style>
  .pagination-container {
    margin-top: 1%;
    display: flex;
    justify-content: center;
  }

  button {
    margin: auto 10px;
    height: 3em;
    padding: 1em;
    border-radius: 10%;
    background-color: var(--main-bg-color);
  }
</style>