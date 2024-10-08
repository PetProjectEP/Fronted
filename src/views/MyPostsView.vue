<script setup>
  import Feed from '@/components/Feed.vue';
  import {getAuthTokenCookie} from '@/common/Helpers.js'; 

  const token = getAuthTokenCookie();
</script>

<template>
  <Feed :token="token"/>
</template>

<style>
</style>