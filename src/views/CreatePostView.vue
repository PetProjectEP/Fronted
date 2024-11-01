<script setup>
  import router from '@/router'
  import PostForm from "@/components/PostForm.vue"
  import { ref, onMounted } from 'vue'
  import { createPost } from '@/common/BackendCalls/PostServiceCalls';

  const form = ref(null)
  const modalWindow = ref(null)
  onMounted(() => modalWindow.value?.scrollIntoView({ behavior: 'smooth' }))

  function create(title, text) {
    createPost(title, text).then(result => {
      if (result.isSuccess === false) {
        alert(result.errStr)
      }
      router.push('/')
    })
  }
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window" ref="modalWindow">
        <PostForm ref="form"/>
        <div class="modal-buttons">
          <button class="good-button" @click="create(form.title, form.text)">Polute!</button>
          <button class="cancel-button" @click="router.push('/')">Cancel</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>