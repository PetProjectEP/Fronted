<script setup>
  import { ref } from 'vue'
  import router from '@/router'
  import Post from '@/components/Post.vue';
  import Pagination from '@/components/Pagination.vue';
  import { getPrevPosts, getNextPosts } from '@/common/BackendCalls/PostServiceCalls';

  const props = defineProps(['token'])
  console.log(props.token)
  
  const canGoBack = ref(false)
  const canGoNext = ref(false)
  const posts = ref([])

  getNextPosts({token: props.token}).then((data) => {
    posts.value = data.posts
    canGoNext.value = data.haveMore
  })

  function goNext() {
    let minPostId = posts.value[posts.value.length - 1].id
    getNextPosts({fromId: minPostId - 1, token: props.token}).then((data) => {
      posts.value = data.posts

      canGoBack.value = true
      canGoNext.value = data.haveMore
    })
  }

  function goBack() {
    let maxPostId = posts.value[0].id
    getPrevPosts({fromId: maxPostId + 1, token: props.token}).then((data) => {
      posts.value = data.posts

      canGoBack.value = data.haveMore
      canGoNext.value = true
    })
  }
</script>

<template>
  <div class="feed-wrapper">
    <div class="posts-grid">
      <Post v-if="posts.length > 0" v-for="(post) in posts" :title="post.title" :text="post.text" :key="post.id" />
      <img v-else src="@/assets/images/no-posts.png"/>
    </div>
    <Pagination :can-go-back="canGoBack" :can-go-next="canGoNext" @go-back="goBack" @go-next="goNext"/>
    <button class="create-post-button" @click="router.push('/create-post')">Share your wisdom</button>
  </div>
</template>

<style scoped>
  .feed-wrapper {
    margin: 2% 5%;
  }

  .posts-grid {
    display: block;
    max-height: 70vh;
    overflow-y: scroll;
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