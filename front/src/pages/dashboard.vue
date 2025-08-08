<template>
  <Layout>
    <!-- 左侧导航栏内容 -->
    <template #nav>
      <!-- 你可以将 el-sub-menu 单独抽出组件 NavMenu.vue -->
      <NavMenu />
    </template>

    <!-- 顶部标题 -->
    <template #header>
      <h1 class="text-xl font-semibold text-gray-800">Tess's Blog</h1>
    </template>

    <!-- 右侧菜单 -->
    <template #menu>
      <MenuComponent />
    </template>

    <!-- 主体内容 -->
    <CardList />

    <!-- Footer（可选自定义） -->
    <template #footer>
      <p class="text-gray-500">© 2025 Tess Lin. Dashboard Module.</p>
    </template>
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
    