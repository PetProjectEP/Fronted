<script setup>
  import { ref } from 'vue'
  import router from '@/router'
  import Post from '@/components/Post.vue';
  
  const lorem255 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos temporibus quaerat eaque sed necessitatibus unde ab aut libero perspiciatis accusantium architecto odit quo minima voluptate natus culpa eveniet commodi, eum alias magnam voluptatem dolores. Iste repellat illum mollitia nobis vel obcaecati assumenda ad asperiores cupiditate. Vitae quia esse adipisci blanditiis earum voluptatem a at, alias inventore aperiam nihil, doloremque harum eum cum beatae ipsa fuga laborum officia nesciunt dignissimos iste. Eos vero nam magni reprehenderit perferendis labore consequatur neque debitis, aliquid perspiciatis sint eius sit quaerat architecto quam ipsam libero quod recusandae. Cupiditate corporis repudiandae sed facilis. Obcaecati et delectus veniam iure voluptate! Nam accusantium voluptas iusto nisi consectetur sunt magni ratione veniam adipisci aperiam. Aperiam distinctio repellendus, fuga dicta voluptatibus, dolorum possimus aliquid officia beatae soluta corporis rerum accusamus quia quam impedit ab voluptatem ipsam omnis! Sed impedit optio veritatis dolorem distinctio cumque. Nobis doloribus maxime, modi corporis voluptatibus nisi amet minus dignissimos earum distinctio saepe. Sed quia autem tenetur ex dolorum distinctio illo, veniam deleniti animi, repellat repellendus fugiat, incidunt cupiditate esse. Alias, reprehenderit in soluta cum ex, at consequuntur necessitatibus velit asperiores minima, iure tenetur! Esse eos, facere aspernatur labore sint sed ipsam temporibus delectus possimus corrupti laudantium et! Sit, adipisci iure praesentium voluptatibus earum assumenda tenetur? At ipsam voluptatum earum nostrum cupiditate iusto quaerat error molestias illo iste, suscipit ex harum adipisci eum ratione animi perspiciatis voluptatibus et? Ex quidem dolorum nam repudiandae quam? Aut, temporibus? Facere architecto voluptas culpa rerum, aliquid doloribus doloremque voluptatibus, odio quas illo ut, tenetur ducimus?"
  const testData = [ { "title": "Brand new post1", "text": lorem255 },
                     { "title": "Brand new post2", "text": lorem255 },
                     { "title": "Brand new post3", "text": lorem255 } ]
</script>

<template>
  <div class="feed-wrapper">
    <div class="posts-grid">
      <Post v-for="(post, idx) in testData" :title="post.title" :text="post.text" :key="idx" />
    </div>
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
</style>