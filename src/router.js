import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/dashboard',
          component: () => import('@/components/Dashboard')
        },
        {
          path: '/user/list',
          component: () => import('@/components/user/UserList')
        },
        {
          path: '/user/center',
          component: () => import('@/components/user/UserCenter')
        },
        {
          path: '/user/setting',
          component: () => import('@/components/user/UserSetting')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.token) {
      next()
    } else {
      return router.push('/login')
    }
  }
})

export default router
