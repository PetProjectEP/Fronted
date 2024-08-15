<script setup>
  import router from '@/router';
  import { ref, onMounted } from "vue";

  const name = ref('No name retrieved!')
  onMounted(() => getNameByToken())

  function logOut() {
    const destroySessionUrl = 'http://127.0.0.1:3000/sessions/'
    let token = (document.cookie.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]

    fetch(destroySessionUrl + token, {
      method: 'DELETE',
      mode: 'cors'
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          document.cookie = 'Token=; Max-Age=0'
          alert('Logged out!')
          router.go()
        })
      }
      else if (response.status === 422) {
        alert('Wrong session to destroy')
      }
      else {
        console.log('Oooups, something went wrong...')
      }
    })
  }

  function getNameByToken() {
    const getNameUrl = 'http://127.0.0.1:3000/sessions/'
    let token = (document.cookie.match(/^(?:.*;)?\s*Token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
  
    fetch(getNameUrl + token, {
      method: 'GET',
      mode: 'cors'
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => { name.value = json.name })
      }
      else if (response.status === 422) {
        alert('No user with this token')
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
  }

  .name {
    padding: 1em;
    font: bold 1em sans-serif;
  }
</style>