<script setup>
  import { ref } from 'vue';

  const title = ref("")
  const text = ref("")
  defineExpose({title, text})
</script>

<template>
  <div class="inputs">
    <input v-model="title" placeholder="Name your emission..."/>
    <textarea v-model="text" placeholder="Write down your powerful thoughts..."/>
  </div>
</template>

<style scoped>
  .inputs {
    width: 100%;
    text-align: center;
  }

  input {
    font-size: 24px;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 2em;
    margin: 1.5em 0 0 0;
    padding: 1px 10px;
  }

  textarea {
    font-size: 24px;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 10em;
    margin: 1.5em 0 0 0;
    padding: 1px 10px;
    resize: none;
  }
</style>