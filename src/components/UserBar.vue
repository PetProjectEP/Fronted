<script setup>
  import { ref, watch} from "vue";
  import { logOut, getUserByToken } from "@/common/BackendCalls/UserServiceCalls";

  const name = ref("")
  getUserByToken().then((user) => name.value = user.name)
</script>

<template>
  <div class="user-bar-container">
    <h2 class="name">{{ name }}</h2>
    <button class="log-out-button transparent" @click="logOut()">Log out</button>
  </div>
</template>

<style scoped>
  .user-bar-container {
    display: flex;
    justify-content: center;
  }

  .log-out-button { 
    border: none;
    padding: 1em;
    background-color: var(--main-bg-color);
    height: max-content;
    align-self: center;
  }

  .name {
    padding: 1em;
    font: bold 1em sans-serif;
  }
</style>