<script setup>
  import { ref, watch} from "vue";
  import router from '@/router';
  import { flushAuthTokens } from "@/common/Helpers";
  import { logOut, getUserByToken } from "@/common/BackendCalls/UserServiceCalls";

  const name = ref("")
  getUserByToken().then((user) => {
    if (user) {
      name.value = user.name
    }
    else {
      flushAuthTokens()
      window.location.reload()
    }
  })

  function logOutHandler() {
    logOut().then((isSuccessful) => {
      if (isSuccessful) {
        router.push('/').then(() => { window.location.reload() })
      }
      else {
        console.log('Oooups, something went wrong...')
      }
    })
  }
</script>

<template>
  <div class="user-bar-container">
    <h2 class="name">{{ name }}</h2>
    <button class="log-out-button transparent" @click="logOutHandler()">Log out</button>
  </div>
</template>

<style scoped>
  .user-bar-container {
    display: flex;
    justify-content: center;
  }

  .log-out-button { 
    background-color: var(--main-bg-color);
    border: none;
    margin: 0px 10px;
    height: 3em;
    padding: 1em;
    font-size: 16px;
    align-self: center;
  }

  .name {
    padding: 1em;
    font-size: 1em;
    font-weight: bold;
  }
</style>