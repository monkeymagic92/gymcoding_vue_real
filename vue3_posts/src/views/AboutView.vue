<template>
  <div>
    <h2>About view</h2>    
    <button class="btn btn-primary" @click="$router.push('/')">Home으로 이동</button>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log('route.path: ', route.path);
</script>

<style lang="scss" scoped>

</style>