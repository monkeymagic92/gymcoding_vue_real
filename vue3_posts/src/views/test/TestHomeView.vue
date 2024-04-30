<template>
  <div>
    <h1>Test Home</h1>
    <button type="button" @click="moveChild1">child1</button>
    <button type="button" @click="moveChild2">child2</button>
    <hr>
    <RouterView></RouterView>

    <br><hr><hr><br>
    {{ obj.name }}<br>
    {{ obj.age }}
    <br>
    {{ testData }}
    {{ testData2 }}

    <TestTestView :obj="obj" @fnTest="fnTest"></TestTestView>
    
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import TestTestView from "./TestTestView.vue";
import { ref } from "vue";
  
  let obj = ref({});
  const testData = ref('');
  const testData2 = ref('');

  const fnTest = (p1, p2) => {
    testData.value = p1;
    testData2.value = p2;
  }
  

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