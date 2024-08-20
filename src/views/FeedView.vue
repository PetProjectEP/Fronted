<script setup>
  import { ref } from 'vue'
  import Post from '@/components/Post.vue';
  const apiUrl = 'http://127.0.0.1:3001/posts'
  
  // const temp = ref('No data yet')
  // fetch(apiUrl).then((response) => {
  //   if (response.ok) {
  //     response.json().then((data) => temp.value = data)
  //   }
  // })

  const testData = [ { "title": "Brand new post1", "text": "Wise thought1" },
                     { "title": "Brand new post2", "text": "Wise thought2" },
                     { "title": "Brand new post3", "text": "Wise thought3" } ]
</script>

<template>
  <div class="feed-wrapper">
    <div class="posts-grid">
      <Post v-for="(post, idx) in testData" :title="post.title" :text="post.text" :key="idx" />
    </div>
  </div>
</template>

<style scoped>
  .feed-wrapper {
    margin: auto 5% 5%;
  }
  .posts-grid {
    display: block;
    padding: 1% 2%;
  }
</style>