<script setup>
  import { ref } from 'vue'
  import router from '@/router'
  import Post from '@/components/Post.vue';
  import Pagination from '@/components/Pagination.vue';
  import { getPrevPosts, getNextPosts } from '@/common/BackendCalls/PostServiceCalls';

  const props = defineProps(['token'])
  
  // If the array were empty, it would display "No posts" stub every time while actual posts are loading
  const posts = ref([[]])
  const canGoBack = ref(false)
  const canGoNext = ref(false)

  getNextPosts({token: props.token}).then((data) => {
    posts.value = data.posts
    canGoNext.value = data.haveMore
  })

  function refresh() {
    let newestPostId = posts.value[0].id
    getNextPosts({fromId: newestPostId, token: props.token}).then((data) => {
      posts.value = data.posts

      canGoBack.value = true
      canGoNext.value = data.haveMore
    })
  }

  function goNext() {
    let oldestPostId = posts.value[posts.value.length - 1].id
    getNextPosts({fromId: oldestPostId - 1, token: props.token}).then((data) => {
      posts.value = data.posts

      canGoBack.value = true
      canGoNext.value = data.haveMore
    })
  }

  function goBack() {
    let newestPostId = posts.value[0].id
    getPrevPosts({fromId: newestPostId + 1, token: props.token}).then((data) => {
      posts.value = data.posts

      canGoBack.value = data.haveMore
      canGoNext.value = true
    })
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
        @post-deleted="refresh"
      />
      <img v-else src="@/assets/images/no-posts.png"/>
    </div>
    <div class="feed-footer">
      <Pagination :can-go-back="canGoBack" :can-go-next="canGoNext" @go-back="goBack" @go-next="goNext"/>
      <button class="create-post-button" @click="router.push('/create-post')">Share your wisdom</button>
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
    height: 3em;
    padding: 1em;
    background-color: var(--confirm-color);
    border: none;
    border-radius: 15%;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
    width: 100%;
  }
</style>