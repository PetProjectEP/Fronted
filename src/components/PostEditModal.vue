<script setup>
  import PostForm from './PostForm.vue';
  import { ref } from 'vue';
  import { editPost } from '@/common/BackendCalls/PostServiceCalls';

  const form = ref(null)
  const props = defineProps(['id'])
  const emit = defineEmits(['postEdited', 'editionCanceled'])

  function edit() {
    editPost(props.id, form.value.title, form.value.text).then(result => {
      if (result.isSuccess) {
        emit('postEdited', form.value.title, form.value.text)
      }
      else {
        alert(result.errStr)
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
        <div class="modal-buttons">
          <button class="good-button" @click="edit">Edit</button>
          <button class="cancel-button" @click="emit('editionCanceled')">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
</style>