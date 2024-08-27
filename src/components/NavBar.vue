<script setup>
  import router from '@/router';
  import UserBar from './UserBar.vue';

  function isLoggedIn() {
    return document.cookie.indexOf('Token=') == -1 ? false : true
  }
</script>

<template>
  <header>
    <div class="navbar">
      <div class="title-area">
        <!-- Some image here -->
        <h1 class="title"> Thoughts junkyard </h1>
      </div>
      <UserBar v-if="isLoggedIn()" />
      <div class="user-area" v-else>
        <button class="sign-in-button" @click="router.push('/sign-in')">Sign in</button>
        <button class="sign-up-button transparent" @click="router.push('/sign-up')">Sign up</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5% 1% 0%;
    background-color: rgb(239, 236, 211);
  }

  .sign-in-button {
    margin: 0px 10px;
    border: none;
    height: 3em;
    padding: 1em;
    background-color: var(--confirm-color);
  }

  .sign-up-button {
    margin: 0px 10px;
    border: none;
    height: 3em;
    padding: 1em;
    background-color: var(--main-bg-color);
  }

  .title {
    font: bold 2.5em sans-serif;
  }
</style>