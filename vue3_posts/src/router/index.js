import { createRouter, createWebHistory }  from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import TestHomeView from '@/views/test/TestHomeView.vue';
import TestChild1View from '@/views/test/TestChild1View.vue';
import TestChild2View from '@/views/test/TestChild2View.vue';
import TestView from '@/views/test/TestView.vue';

const routes = [
  {
    path: '/',
    name: '',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/posts',    
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',    
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    path: '/posts/:id',    
    name: 'PostDetail',
    component: PostDetailView,
  },
  {
    path: '/posts/:id/edit',    
    name: 'PostEdit',
    component: PostEditView,
  },
  {
    path: '/:pathMatch(.*)*',    
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/nested',    
    name: 'Nested',
    component: NestedView,
    children: [
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView
      },
      {
        path: 'one',
        name: 'NestedOne',
        component: NestedOneView
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
    ]
  },
  {
    path: '/test',
    name: 'TestHome',
    component: TestHomeView,
    children: [
      {
        path: '',
        name: 'TestView',
        component: TestView
      },
      {
        path: 'testChild1',
        name: 'TestChild1',
        component: TestChild1View
      },
      {
        path: 'testChild2',
        name: 'TestChild2',
        component: TestChild2View
      },
    ]
  }
  
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;