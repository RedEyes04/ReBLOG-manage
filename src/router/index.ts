import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/IndexView.vue'
// import hello from '../components/HelloWorld.vue'

const routes = [
    {
      path: '/',
      redirect:'/overview',
      component: IndexView,
      children: [
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 将被渲染到 User 的 <router-view> 内部
          path: 'overview',
          component:()=>import('../views/OverView.vue'),
        },
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 将被渲染到 User 的 <router-view> 内部
          path: 'localfile',
          component:()=>import('../views/FileView.vue'),
        },
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 将被渲染到 User 的 <router-view> 内部
          path: 'article',
          component:()=>import('../views/ArticleView.vue'),
        },
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 将被渲染到 User 的 <router-view> 内部
          path: 'gallery',
          component:()=>import('../views/GalleryView.vue'),
        },
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 将被渲染到 User 的 <router-view> 内部
          path: 'diary',
          component:()=>import('../views/DiaryView.vue'),
        },
        
        
      ],
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router