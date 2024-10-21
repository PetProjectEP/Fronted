<script setup>
  import { ref } from 'vue';
  import { getUserIdCookie } from '@/common/Helpers';
  import PostDeleteConfirmation from '@/components/PostDeleteConfirmation.vue'

  const props = defineProps(['title', 'text', 'user_id', 'id'])
  const emit = defineEmits(['postDeleted'])

  const showButtons = ref(false)
  const showDeleteConfirmation = ref(false)

  function handleDeletion() {
    showDeleteConfirmation.value = false
    emit('postDeleted')
  }

  function handleDeletionCancel() {
    showDeleteConfirmation.value = false
  }
</script>

<template>
  <div class="post-wrapper">
    <div class="post-head">
      <h2 class="post-title">{{ title }}</h2>
      <div class="post-buttons" v-if="user_id == getUserIdCookie()">
        <div v-show="showButtons">
          <button class="edit-button">Edit</button>
          <button class="delete-button" @click="showDeleteConfirmation=true">X</button>
        </div>
        <button @click="showButtons = !showButtons"> ... </button>
      </div>
    </div>
    <p class="post-text">{{ text }}</p>
  </div>
  <PostDeleteConfirmation v-if="showDeleteConfirmation" 
    :id="id"
    @post-deleted="handleDeletion"
    @deletion-canceled="handleDeletionCancel"
  />
</template>

<style scoped>
  .post-wrapper {
    border-bottom: 1px solid;
  }

  .post-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-buttons {
    display: flex;
    justify-content: center;
  }

  button {
    font-size: 12px;
  }

  .delete-button {
    background-color: var(--alert-color);
  }

  .post-text {
    font-size: 18px;
  }
</style>