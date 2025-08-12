<template>
  <Layout>
    <!-- 左侧导航栏内容 -->

    <!-- 顶部标题 -->
    <template #header>
      <h1 class="text-6xl font-semibold text-gray-800">Tess's Blog</h1>
    </template>

    <!-- 右侧菜单 -->

    <!-- 主体内容 -->
    <CardList />

    <!-- Footer（可选自定义） -->
  </Layout>
</template>

<script setup>
// 引入菜单组件
import Layout from '@/components/layout.vue'
import MenuComponent from '@/components/menus.vue'
import { useAuthStore } from '@/utils/auth'
import CardList from '@/components/cardlist.vue'

const authStore = useAuthStore()
</script>

<style scoped>
/* 可以根据需要调整样式 */
aside {
  height: 0vh;
  position: sticky;
  top: 0px;
}
</style>
    