<script setup>
  import router from '@/router'
  import { ref, onMounted } from 'vue'
  import { signIn } from '@/common/BackendCalls/UserServiceCalls';

  const nickname = ref("")
  const password = ref("")

  const signInWindow = ref(null)
  onMounted(() => signInWindow.value?.scrollIntoView({ behavior: 'smooth' }))
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window" ref="signInWindow">
        <div class="inputs">
          <input v-model="nickname" placeholder="Nickname..."/>
          <input type="password" v-model="password" placeholder="Password..."/>
        </div>
        <div class="modal-buttons">
          <button class="good-button" @click="signIn(nickname, password)">Sign in!</button>
          <button class="cancel-button" @click="router.push('/')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>