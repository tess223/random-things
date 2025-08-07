<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- 侧边菜单 -->
    <aside class="w-64 bg-white shadow-md overflow-y-auto">
      <MenuComponent />
    </aside>

    <!-- 主内容区域 -->
    <main class="flex-1 overflow-y-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">欢迎来到主页面</h1>
        <div v-if="authStore.user" class="text-gray-600">
          当前用户: {{ authStore.user.username }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 引入菜单组件
import MenuComponent from '@/components/menus.vue'
import { useAuthStore } from '@/utils/auth'

const authStore = useAuthStore()
</script>

<style scoped>
/* 可以根据需要调整样式 */
aside {
  height: 100vh;
  position: sticky;
  top: 0;
}
</style>
    