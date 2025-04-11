import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import hello from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/overview',
    component: IndexView,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'overview',
        component: () => import('../views/OverView.vue'),
      }, {
        path: 'localfile',
        component: () => import('../views/FileView.vue'),
      }, {
        path: 'article',
        component: () => import('../views/ArticleView.vue'),
      }, {
        path: 'gallery',
        component: () => import('../views/GalleryView.vue'),
      }, {
        path: 'diary',
        component: () => import('../views/DiaryView.vue'),
      },
      {
        path: 'hello',
        component: hello,
      },
    ],
  },
  {
    path: '/editgallery',
    component: () => import('../views/EditGallery.vue'),
  }, {
    path: '/editarticle',
    component: () => import('../views/EditArticView.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  }, {
    path: '/register',
    component: () => import('../views/Register.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
//再路由请求之前
router.beforeEach((to,from,next)=>{
  if(to.matched.length===0){
    //地址错误发生跳转
    from.name?next({
      name:from.name
    }):next('/errorinfo')
  }else{
    next();
  }
})
export default router;