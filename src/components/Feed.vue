<script setup>
  import { ref } from 'vue'
  import router from '@/router'
  import Post from '@/components/Post.vue';
  import Pagination from '@/components/Pagination.vue';
  import { isLoggedIn } from '@/common/Helpers';
  import { getPostsList } from '@/common/BackendCalls/PostServiceCalls';

  const props = defineProps(['token'])
  
  // If the array were empty, it would display "No posts" stub every time while actual posts are loading
  const posts = ref([[]])
  const backPageId = ref(null)
  const nextPageId = ref(null)

  getPostsList({ token: props.token }).then((data) => updateFeed(data))

  function updateFeed(data) {
    posts.value = data.posts
    backPageId.value = data.backPageId
    nextPageId.value = data.nextPageId
  }

  function handleDeletion(deletedPostId) {
    // If it was the last post
    if (posts.value.length === 1) {
      getPostsList({ startingId: backPageId.value, token: props.token })
        .then((data) => updateFeed(data))
    }
    else {
      getPostsList({ startingId: posts.value[0].id, token: props.token })
        .then((data) => updateFeed(data))
    }
  }

  function goNext() {
    getPostsList({ startingId: nextPageId.value, token: props.token })
      .then((data) => updateFeed(data))
  }

  function goBack() {
    getPostsList({ startingId: backPageId.value, token: props.token })
      .then((data) => updateFeed(data))
  }
</script>

<template>
  
  <div class="feed-wrapper">
    <div class="posts-grid">
      <Post v-if="posts.length > 0" v-for="(post) in posts" 
        :title="post.title" 
        :text="post.text" 
        :user_id="post.user_id" 
        :id="post.id" 
        :key="post.id"
        @post-deleted="handleDeletion"
      />
      <img v-else src="@/assets/images/no-posts.png"/>
    </div>
    <div class="feed-footer">
      <Pagination :can-go-back="backPageId !== null" :can-go-next="nextPageId !== null" @go-back="goBack" @go-next="goNext"/>
      <button v-if="isLoggedIn()" class="create-post-button good-button" @click="router.push('/create-post')">Share your wisdom</button>
    </div>
    
  </div>
</template>

<style scoped>
  .feed-wrapper {
    margin: 2% 10%;
    height: 80vh;
    display: grid;
    grid-template-rows: 4fr 1fr;
    grid-template-areas:
      "posts"
      "footer";
  }

  .posts-grid {
    grid-area: posts;
    display: block;
    overflow-y: scroll;
  }

  .feed-footer {
    grid-area: footer;
  }

  .posts-grid::-webkit-scrollbar {
    display: none;
  }

  .create-post-button {
    margin-top: 10px;
    float: right;
    border: none;
    font-size: 16px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
    width: 100%;
  }
</style>