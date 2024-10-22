<script setup>
  import PostForm from './PostForm.vue';
  import { ref } from 'vue';
  import { editPost } from '@/common/BackendCalls/PostServiceCalls';

  const form = ref(null)
  const props = defineProps(['id'])
  const emit = defineEmits(['postEdited', 'editionCanceled'])

  function edit() {
    editPost(props.id, form.value.title, form.value.text).then(isEdited => {
      if (isEdited) {
        emit('postEdited', form.value.title, form.value.text)
      }
      else {
        emit('editionCanceled')
      }
    })
  }
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="modal-window">
        <PostForm ref="form" />
        <div class="buttons">
          <button class="edit-button" @click="edit">Edit</button>
          <button class="cancel-button" @click="emit('editionCanceled')">Cancel</button>
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
    height: 50%;
    width: 25%;
    background-color: var(--main-bg-color);
    display: flex;
    flex-direction: column;
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

  button {
    font-size: 20px;
  }
</style>