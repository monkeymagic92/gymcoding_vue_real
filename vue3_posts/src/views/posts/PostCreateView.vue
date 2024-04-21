<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4">
    <form @submit.prevent="save">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input v-model="form.title" type="text" class="form-control" id="title">
      </div>
      <div class="mb-3">
        <label for="contens" class="form-label">내용</label>
        <textarea v-model="form.content" class="form-control" id="contens" rows="3"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary">저장</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {createPost} from '@/api/posts';
import { ref } from 'vue';

const router = useRouter();

// v-model로 입력한 데이터를 받은후 저장하는 data 객체에 담기위한 값
const form = ref({
  title: null,
  content: null,
});

const save = () => {
  try {
    // insert할 data 셋팅 ( data 객체에 반응형 form 변수와 현재시간 데이터를 셋팅)
    const data = {
      ...form.value,
      createdAt: Date.now(),
    }

    // 등록
    createPost(data);

    // 등록성공후 PostList 페이지로 이동
    router.push({
      name: 'PostList',
    });
  } catch (error) {
    console.log('저장에러 : ', error)
  }
  
}

const goListPage = () => {
  router.push({name: 'PostList'});
}

</script>

<style lang="scss" scoped>

</style>