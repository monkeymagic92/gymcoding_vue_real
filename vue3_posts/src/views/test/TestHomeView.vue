<template>
  <div>
    <h1>Test Home</h1>
    <button type="button" @click="moveChild1">child1</button>
    <button type="button" @click="moveChild2">child2</button>
    <hr>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

  const router = useRouter();

  const moveChild1 = () => {
    router.push({
      name: 'TestChild1'
    });
  }
  

  const moveChild2 = () => {
    router.push({
      name: 'TestChild2'
    });
  }


</script>

<style lang="scss" scoped>

</style>