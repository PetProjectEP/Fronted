<script setup>
  import router from '@/router'
  import PostForm from "@/components/PostForm.vue"
  import { ref, onMounted } from 'vue'
  import { createPost } from '@/common/BackendCalls/PostServiceCalls';

  const form = ref(null)
  const modalWindow = ref(null)
  onMounted(() => modalWindow.value?.scrollIntoView({ behavior: 'smooth' }))

  function create(title, text) {
    createPost(title, text).then(isCreated => {
      if (isCreated === false) {
        alert('Something went wrong...')
      }
      router.push('/')
    })
  }
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window" ref="modalWindow">
      <div class="content">
        <PostForm ref="form"/>
        <div class="buttons">
          <button class="submit-button" @click="create(form.title, form.text)">Polute!</button>
          <button class="cancel-button" @click="router.push('/')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-window {
    border-radius: 1%;
    padding: 2% 5%;
    height: 60%;
    width: 35%;
    background-color: rgb(254, 250, 224);
    display: flex;
  }

  .content {
    margin: auto;
    justify-self: center;
    align-self: center;
  }

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 15% 0 10%;
  }

  .submit-button {
    font-size: 32px;
    height: 2em;
    padding: 10px;
    background-color: var(--confirm-color);
  }

  .cancel-button {
    font-size: 32px;
    height: 2em;
    padding: 10px;
    background-color: rgb(255, 255, 255);
  }
</style>