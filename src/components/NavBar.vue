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
        <img src="@/assets/images/logo.png">
        <h1 class="title"> Thoughts junkyard </h1>
        <div class="options">
          <a class="to-feed-link nostyle" @click="router.push('/')">Feed</a>
          <a class="to-my-posts-link nostyle" @click="router.push('/my-posts')">My posts</a>
        </div>
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
    padding: 5px;
    background-color: rgb(239, 236, 211);
  }

  .options {
    border-left: 1px solid black;
    margin: auto 10px;
    padding-left: 10px;
  }

  .options > a {
    font: 1.25em sans-serif;
    margin: auto 15px auto 0;
    cursor: pointer;
  }

  a.nostyle:link {
    text-decoration: inherit;
    color: inherit;
  }

  a.nostyle:visited {
    text-decoration: inherit;
    color: inherit;
  }

  button {
    border: none;
    margin: 0px 10px;
    height: 3em;
    padding: 1em;
  }

  .sign-in-button {   
    background-color: var(--confirm-color);
  }

  .sign-up-button {
    background-color: var(--main-bg-color);
  }

  .title {
    font: bold 1.25em sans-serif;
  }

  .title-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    height: 4em;
    margin: auto 15px auto 5px;
  }
</style>