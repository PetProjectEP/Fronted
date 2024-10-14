<script setup>
  import { getUserIdCookie } from '@/common/Helpers';
  import { deletePost } from '@/common/BackendCalls/PostServiceCalls';
  import { ref } from 'vue';

  const props = defineProps(['title', 'text', 'user_id', 'id'])
  const emit = defineEmits(['postDeleted'])

  const showButtons = ref(false)

  function deletePostFromFeed() {
    deletePost(props.id).then(isDeleted => {
      if (isDeleted) {
        emit('postDeleted')
      }
      else {
        alert('Something went wrong on post deletion!')
      }
    })
  }
</script>

<template>
  <div class="post-wrapper">
    <div class="post-head">
      <h2 class="post-title">{{ title }}</h2>
      <div class="post-buttons" v-if="user_id == getUserIdCookie()">
        <div v-show="showButtons">
          <button class="edit-button">Edit</button>
          <button class="delete-button" @click="deletePostFromFeed">X</button>
        </div>
        <button @click="showButtons = !showButtons"> ... </button>
      </div>
    </div>
    <p class="post-text">{{ text }}</p>
  </div>
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
    background-color: rgba(185, 148, 112, 0.649);
  }

  .post-text {
    font-size: 18px;
  }
</style>