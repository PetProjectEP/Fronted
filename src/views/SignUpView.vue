<script setup>
  import router from '@/router'
  import { ref, onMounted } from 'vue'
  import { signUp, signIn } from '@/common/BackendCalls/UserServiceCalls';

  const nickname = ref("")
  const name = ref("")
  const surname = ref("")
  const password = ref("")
  const passwordConfirmation = ref("")

  const signUpWindow = ref(null)
  onMounted(() => signUpWindow.value?.scrollIntoView({ behavior: 'smooth' }))

  function handleSignUp() {
    signUp(
      nickname.value,
      name.value,
      surname.value,
      password.value,
      passwordConfirmation.value
    ).then((status) => {
      if (status === true) {
        router.push('/').then(() => { window.location.reload() })
      }
      else {
        alert(status)
      }
    })

  }
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window" ref="signUpWindow">
        <div class="inputs">
          <input v-model="nickname" placeholder="Nickname..."/>
          <input v-model="name" placeholder="Name..."/>
          <input v-model="surname" placeholder="Surname..."/>
          <input type="password" v-model="password" placeholder="Password..."/>
          <input type="password" v-model="passwordConfirmation" placeholder="Confirm your password..."/>
        </div>
        <div class="modal-buttons">
          <button class="good-button" @click="handleSignUp()">Sign up!</button>
          <button class="cancel-button" @click="router.push('/')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>