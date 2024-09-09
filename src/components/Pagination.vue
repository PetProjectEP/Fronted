<script setup>
</script>

<template>
  <div class="pagination-container">
    <button class="prev-button"><< Back</button>
    <button class="next-button">Give me more! >></button>
  </div>
</template>

<style>
  .pagination-container {
    margin-top: 1%;
    display: flex;
    justify-content: center;
  }

  button {
    margin: auto 10px;
    height: 3em;
    padding: 1em;
    border-radius: 10%;
    background-color: var(--main-bg-color);
  }
</style>