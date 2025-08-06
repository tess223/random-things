<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- 侧边菜单 -->
    <aside class="w-64 bg-white shadow-md">
      <MenuComponent />
    
    </aside>

    <!-- 主内容区域 -->
    <main class="flex-1 p-6">
        <CardList />
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
import { useAuthStore } from '@/stores/auth'
import CardList from '@/components/cardlist.vue'

const authStore = useAuthStore()
</script>

<style scoped>
/* 可以根据需要调整样式 */
aside {
  height: 100vh;
  position: sticky;
  top: 50;
}
</style>
    