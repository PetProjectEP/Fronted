<script setup>
  import { ref } from 'vue';
  import { getUserIdCookie } from '@/common/Helpers';
  import PostDeleteConfirmation from '@/components/PostDeleteConfirmation.vue';
  import PostEditModal from './PostEditModal.vue';

  const props = defineProps(['title', 'text', 'user_id', 'id'])
  const displayedTitle = ref(props.title)
  const displayedText = ref(props.text)

  const emit = defineEmits(['postDeleted', 'postEdited'])

  const showButtons = ref(false)
  const showDeleteConfirmation = ref(false)
  const showEditModal = ref(false)

  function handleDeletion() {
    showDeleteConfirmation.value = false
    emit('postDeleted')
  }

  function handleDeletionCancel() {
    showDeleteConfirmation.value = false
  }

  function handleEdition(newTitle, newText) {
    displayedTitle.value = newTitle
    displayedText.value = newText

    showEditModal.value = false
    showButtons.value = false
  }

  function handleEditionCancel() {
    showEditModal.value = false
  }
</script>

<template>
  <div class="post-wrapper">
    <div class="post-head">
      <h2 class="post-title">{{ displayedTitle }}</h2>
      <div class="post-buttons" v-if="user_id == getUserIdCookie()">
        <div v-show="showButtons">
          <button class="edit-button" @click="showEditModal=true">Edit</button>
          <button class="delete-button" @click="showDeleteConfirmation=true">X</button>
        </div>
        <button @click="showButtons = !showButtons"> ... </button>
      </div>
    </div>
    <p class="post-text">{{ displayedText }}</p>
  </div>
  <PostDeleteConfirmation v-if="showDeleteConfirmation" 
    :id="id"
    @post-deleted="handleDeletion"
    @deletion-canceled="handleDeletionCancel"
  />
  <PostEditModal v-if="showEditModal"
    :id="id"
    :original-title="title"
    :original-text="text"
    @post-edited="handleEdition"
    @edition-canceled="handleEditionCancel"
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
    font-size: 14px;
  }

  .delete-button {
    background-color: var(--alert-color);
  }

  .post-text {
    font-size: 18px;
  }
</style>