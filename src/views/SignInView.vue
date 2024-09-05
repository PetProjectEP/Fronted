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
      <div class="content">
        <div class="inputs">
          <input v-model="nickname" placeholder="Nickname..."/>
          <input type="password" v-model="password" placeholder="Password..."/>
        </div>
        <div class="buttons">
          <button class="submit-button" @click="signIn(nickname, password)">Sign in!</button>
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
    height: 50%;
    width: 30%;
    background-color: rgb(254, 250, 224);
    display: flex;
  }

  .content {
    margin: auto;
    justify-self: center;
    align-self: center;
  }

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