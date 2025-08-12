<template>
<layout>
  <template #header>
    <h1>自定义标题</h1>
  </template>

  <div class="main">主页面</div>

  <template #footer>
    <div>自定义底部</div>
  </template>
</layout>
</template>

<script setup>
// 引入菜单组件
import layout from '@/components/layout.vue'
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
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
    