<script setup>
  import { ref } from 'vue';
  import { deletePost } from '@/common/BackendCalls/PostServiceCalls';

  const props = defineProps(['id'])
  const emit = defineEmits(['postDeleted', 'deletionCanceled'])

  function deletePostFromFeed() {
    deletePost(props.id).then(isDeleted => {
      if (isDeleted) {
        emit('postDeleted')
      }
      else {
        emit('deletionCanceled')
      }
    })
  }
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="content">
          <h3>You are going to erase your own knowledge!</h3>
          <div class="buttons">
            <button class="delete-button" @click="deletePostFromFeed">Yeah, I am</button>
            <button class="cancel-button" @click="emit('deletionCanceled')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .modal-overlay {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .modal-window {
    border-radius: 1%;
    padding: 2% 5%;
    height: 30%;
    width: 25%;
    background-color: var(--main-bg-color);
    display: flex;
  }

  .content {
    align-items: center;
    justify-content: center;
  }

  .buttons {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
  }

  .delete-button {
    background-color: var(--alert-color);
  }
  
  h3 {
    text-align: center;
    font-size: 32pt;
  }
</style>