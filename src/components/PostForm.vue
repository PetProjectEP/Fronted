<script setup>
  import { ref } from 'vue';

  const props = defineProps(['originalTitle', 'originalText'])

  const title = ref(props.originalTitle)
  const text = ref(props.originalText)
  defineExpose({title, text})
</script>

<template>
  <div class="inputs">
    <input v-model="title" placeholder="Name your emission..."/>
    <textarea v-model="text" placeholder="Write down your powerful thoughts..."/>
  </div>
</template>

<style scoped>
</style>