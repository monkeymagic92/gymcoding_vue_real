<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4">
    <form @submit.prevent>
      <div class="row g-3">
        <div class=col>
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4">
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem :title="post.title" :content="post.content" :created-at="post.createdAt" @click="goPage(post.id)"></PostItem>        
      </div>      
    </div>
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !(params._page > 1) }"> <!-- 1번페이지에서 이전페이지 버튼 비활성화 -->
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="--params._page">  <!-- 페이지(<<) 버튼 클릭 -->
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in pageCount" :key="page" class="page-item" :class="{active: params._page === page}">
          <a class="page-link" href="#" @click.prevent="params._page = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !(params._page < pageCount) }"> <!-- 마지막 페이지에서 다음버튼 비활성화 -->
          <a class="page-link" href="#" aria-label="Next" @click.prevent="++params._page">  <!-- 페이지(>>) 버튼 클릭 -->
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { getPosts } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 객체반응형 선언
const posts = ref([]);

// 날짜기준으로 조회시 오름차순, 내림차순 옵션 주기
const params = ref({
  _sort: 'createdAt', // 날짜 데이터 사용
  _order: 'desc',     // 정렬 (desc, asc)
  _limit: 3,          // 몇개씩 조회할건지?
  _page: 1,           // 몇번째 페이지를 가져올건지 ?
  title_like: '',     // 검색 (like절)

});
// 페이징 옵션 (pagination)
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));


// posts.js 데이터 배열로 가져오기
const fetchPosts = async () => {
  try {
    const {data, headers} = await getPosts(params.value);
    posts.value = data; 
    totalCount.value = headers['x-total-count'];
  } catch(error) {
    console.log('저장에러 : ', error)
  }
  
}
// 일반 조회
//fetchPosts();

// 페이징 버튼 / n개씩 보기 버튼 클릭시 변경됬으면 다시 재조회 (watchEffect는 콜백메소드안에 반응성 데이터가 사용되는경우에만 호출됨 )
watchEffect(fetchPosts);

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