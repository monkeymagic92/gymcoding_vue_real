<template>
  <div>
    <h1>TestTestView</h1>
    <br>
    <input type="text" v-model="obj.name" />
    <input type="text" v-model="obj.age" />
    <br>
    <button type="button" @click="$emit('fnTest', 'Test내용', 'Test2내용')">버튼</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  obj: {
    type: Number,
    
  }
})

const title = ref('');

</script>

<style lang="scss" scoped>

</style>