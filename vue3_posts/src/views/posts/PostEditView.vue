<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4">
    <form @submit.prevent="edit">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input v-model="form.title" type="text" class="form-control" id="title">
      </div>
      <div class="mb-3">
        <label for="contens" class="form-label">내용</label>
        <textarea v-model="form.content" class="form-control" id="contens" rows="3"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">취소</button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getPostById, updatePost } from "@/api/posts";
import { ref } from 'vue';

const route = useRoute();
const id = route.params.id;
const router = useRouter();

// html에 데이터를 보여주기위한 form 객체
const form = ref({
  title: null,
  cntent: null  
});

// 상세 데이터 조회
const fetchPost = async () => {
  const {data} = await getPostById(id);
  setForm(data);
}
fetchPost();

// 필요한 데이터만 추출하기
// 여러 데이터가 넘어올수 있으니, {{ data }} 안에 필요한 데이터만 구조분해할당 하여 form 객체에 set
const setForm = ({title, content, createdAt}) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
}

// 수정
const edit = async () => {
  try {
    await updatePost(id, {...form.value})
    router.push({name: 'PostDetail', params: {id}});
  } catch(error) {
    console.log(error);
  }
}

// '취소' 클릭시 상세페이지로 이동 ( id값을 파라미터로 넘김 )
const goDetailPage = () => {
  router.push({
    name: 'PostDetail',
    parmas: {
      id
    }
  })
}

</script>

<style lang="scss" scoped>

</style>