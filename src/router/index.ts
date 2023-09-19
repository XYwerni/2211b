import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    redirect: '/index',
    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: '/index',
        name: "index",
        component: () => import('../views/indexView.vue'),
      },
      {
        path: '/article',
        name: "article",
        component: () => import('../views/articleView.vue'),
        meta: {
          title: ['面经后台', '面经管理']
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token && to.path == "/") {
    next("/about")
  } else if (!token && to.path != "/") {
    next('/')
  } else {
    next()
  }
})

export default router
