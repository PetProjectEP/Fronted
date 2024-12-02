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
        <div class="hidden-buttons" v-show="showButtons">
          <button class="edit-button" @click="showEditModal=true"><span>Edit</span></button>
          <button class="delete-button" @click="showDeleteConfirmation=true"><span>X</span></button>
        </div>
        <button @click="showButtons = !showButtons"><span>...</span></button>
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
    font-size: 16px;
    letter-spacing: normal;
    margin-bottom: 2%;
    border-bottom: 1px solid;
  }

  .post-head {
    --header-el-height: 1.3em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-title {
    font-size: var(--header-el-height);
  }

  .post-buttons {
    display: flex;
    justify-content: center;
  }

  .hidden-buttons {
    display: flex;
    justify-content: center;
  }

  button {
    max-height: var(--header-el-height);
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .delete-button {
    background-color: var(--alert-color);
  }

  .post-text {
    font-size: 1.2em;
    margin-bottom: 1%;
  }
</style>