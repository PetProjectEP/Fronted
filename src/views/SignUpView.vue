<script setup>
  import router from '@/router'
  import { ref, onMounted } from 'vue'

  const nickname = ref("")
  const name = ref("")
  const surname = ref("")
  const password = ref("")
  const passwordConfirmation = ref("")

  const signUpWindow = ref(null)
  onMounted(() => signUpWindow.value?.scrollIntoView({ behavior: 'smooth' }))

  const userServiceUrl = 'http://127.0.0.1:3000/users'
  
  function submitData() {
    const data = JSON.stringify({
      user: {
        nickname: nickname.value,
        name: name.value,
        surname: surname.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    })

    fetch(userServiceUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: data
    }).then((response) => {
      if (response.ok) {
        response.json().then((text) => console.log(text))
        router.go()
      }
      else if (response.status === 422) {
        response.json().then((parsedErrors) => {
          let errStr = ""
          Object.values(parsedErrors).forEach(arrOfErrors => {
            arrOfErrors.forEach(val => {
              errStr += val + "\n"
            })
          });
          alert("Following errors prevent you from signing up:\n" + errStr)
        })
      }
      else {
        console.log("Oooups, something went wrong...")
      }
    })
  }
  
  
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window" ref="signUpWindow">
      <div class="content">
        <div class="inputs">
          <input v-model="nickname" placeholder="Nickname..."/>
          <input v-model="name" placeholder="Name..."/>
          <input v-model="surname" placeholder="Surname..."/>
          <input type="password" v-model="password" placeholder="Password..."/>
          <input type="password" v-model="passwordConfirmation" placeholder="Confirm your password..."/>
        </div>
        <div class="buttons">
          <button class="submit-button" @click="submitData()">Sign up!</button>
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
    height: 70%;
    width: 40%;
    background-color: rgb(254, 250, 224);
    display: flexs;
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
    margin: 10% 0;
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