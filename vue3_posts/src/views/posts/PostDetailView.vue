<template>
  <div>
    <h2>{{post.title}}</h2>
    <p>{{post.content}}</p>
    <p class="text-muted">{{post.createdAt}}</p>
    <hr class="my-4">
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto">

      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';

const route = useRoute();

// route객체를 사용하여 넘어온 파라미터 id값을 id에 set ( 주식별자를 통해 데이터조회, 화면이동에 사용 )
const id = route.params.id;

// 데이터 셋팅 하기위한 객체
const post = ref({
  title: null,
  content: null,
  createdAt: null,
});

// 상세 데이터 조회
const fetchPost = async () => {
  try {
    const {data} = await getPostById(id);
    setPost(data);

  } catch(error) {
    console.error(error); // console.error로 에러찍기
  }
}
fetchPost();

// 필요한 데이터만 추출하기
// 여러 데이터가 넘어올수 있으니, {{ data }} 안에 필요한 데이터만 구조분해할당 하여 post 객체에 set
const setPost = ({title, content, createdAt}) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
}

// 삭제
const remove = async () => {
  try {
    if(confirm('삭제 하시겠습니까?')) {
      await deletePost(id);
      router.push({name: 'PostList'});
    }
  } catch(error) {
    console.log(error);
  }
}

// 버튼클릭시 리스트, 수정 화면이동
const router = useRouter();
const goListPage = () => {router.push({name: 'PostList'})};
const goEditPage = () => {router.push({name: 'PostEdit', params: {id}})};

</script>

<style lang="scss" scoped>

</style>