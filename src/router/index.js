// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/login.vue'),
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue'),
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard.vue'),
    meta: {
      requiresAuth: true 
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register.vue'),
    meta: {
      guestOnly: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.init() // 确保 token 已加载

  const isAuthenticated = !!authStore.token
  console.log(`Navigating to ${to.path}, auth: ${isAuthenticated}`)

  // 处理路由守卫逻辑
  if (to.meta.guestOnly) {
    // 游客页面：已登录用户重定向到dashboard
    if (isAuthenticated) {
      next('/dashboard')
    } else {
      next()
    }
  } else if (to.meta.requiresAuth) {
    // 需要认证的页面：未登录用户重定向到login
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else if (to.path === '/') {
    // 根路径：根据登录状态重定向
    if (isAuthenticated) {
      next('/dashboard')
    } else {
      next('/login')
    }
  } else {
    // 其他路径
    next()
  }
})

export default router
