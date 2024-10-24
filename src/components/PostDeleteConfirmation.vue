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
          <h3>You are going to erase your own knowledge!</h3>
          <div class="modal-buttons">
            <button class="bad-button" @click="deletePostFromFeed">Yeah, I am</button>
            <button class="cancel-button" @click="emit('deletionCanceled')">Cancel</button>
          </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  h3 {
    text-align: center;
    font-size: 32pt;
  }
</style>