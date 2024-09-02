<script setup>
  import { getAuthToken } from '@/common/Helpers';
import router from '@/router'
  import { ref, onMounted } from 'vue'

  const title = ref("")
  const text = ref("")

  const signInWindow = ref(null)
  onMounted(() => signInWindow.value?.scrollIntoView({ behavior: 'smooth' }))

  const postServiceUrl = 'http://127.0.0.1:3001/posts/'
  
  function submitData() {
    const token = getAuthToken()

    const data = JSON.stringify({
      post: {
        title: title.value,
        text: text.value,
        token: token
      }
    })

    fetch(postServiceUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: data
    }).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          router.push('/')
        })
      }
      else if (response.status === 422) {
        // Validations error here
      }
      else {
        console.log("Oooups, something went wrong...")
      }
    })
  }
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window" ref="signInWindow">
      <div class="content">
        <div class="inputs">
          <input v-model="title" placeholder="Name your emission..."/>
          <textarea v-model="text" placeholder="Write down your powerful thoughts..."/>
        </div>
        <div class="buttons">
          <button class="submit-button" @click="submitData()">Polute!</button>
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

  textarea {
    font-size: 24px;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.2);
    width: 70%;
    height: 10em;
    margin: 1.5em 0 0 0;
    padding: 1px 10px;
    resize: none;
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