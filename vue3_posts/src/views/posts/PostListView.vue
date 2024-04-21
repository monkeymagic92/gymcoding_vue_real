<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4">
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem :title="post.title" :content="post.content" :created-at="post.createdAt" @click="goPage(post.id)"></PostItem>        
      </div>      
    </div>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { getPosts } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 객체반응형 선언
const posts = ref([]);

// posts.js 데이터 배열로 가져오기
const fetchPosts = async () => {
  try {
    const response = await getPosts();
    const {data} = await getPosts();
    posts.value = data;  
  } catch(error) {
    console.log('저장에러 : ', error)
  }
  
}
fetchPosts();

// 상세페이지 이동
const goPage = (id) => {
  router.push({
    name: 'PostDetail',
    params: {
      id
    }
  });
}

</script>

<style lang="scss" scoped>

</style>