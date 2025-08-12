<template>
  <div class="common-layout h-screen">
    <!-- 左侧悬挂导航栏 -->
    <aside class="sidebar-fixed bg-white shadow-md overflow-auto">
      <SideBarMenus />
    </aside>

    <!-- 主体区域 -->
    <div class="right-pane">
      <!-- 顶部 Header -->
      <el-header height="60px" class="bg-white shadow-md flex items-center justify-center text-center px-4">
        <slot name="header">
          <h1 class="text-6xl font-semibold text-gray-800">默认标题</h1>
        </slot>
      </el-header>

      <!-- 中部内容 -->
      <el-main class="bg-gray-50 p-6 overflow-auto relative">
        <!-- 主内容居中 -->
        <div class="main-content-wrapper">
          <div class="main-content">
            <slot />
          </div>
        </div>

        <!-- 右上角菜单 -->
        <MenuComponent />
      </el-main>

      <!-- Footer -->
      <el-footer height="50px" class="text-center text-gray-500 bg-white shadow-inner">
        <slot name="footer">© 2025 Tess's Blog. All rights reserved.</slot>
      </el-footer>
    </div>
  </div>
</template>

<script setup>
import SideBarMenus from './SideBarMenus.vue';
import MenuComponent from './menus.vue';
</script>

<style scoped>
.common-layout {
  --aside-width: 240px;          /* 左侧侧边栏宽度 */
  --main-content-width: 1200px;  /* 主内容宽度 */
  height: 100vh;
  overflow: hidden;
  display: flex;
}

/* 左侧悬挂 Sidebar */
.sidebar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--aside-width);
  height: 100vh;
  z-index: 100;
}

/* 主体区域占满剩余宽度 */
.right-pane {
  margin-left: var(--aside-width);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 居中包裹 */
.main-content-wrapper {
  display: flex;
  justify-content: center; /* 居中内容 */
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px; /* 让内容两边有呼吸空间 */
}

.main-content {
  max-width: var(--main-content-width); /* 限制最大宽度 */
  width: 100%; /* 占满 wrapper */
}

/* 自适应：小屏时主内容占满宽度 */
@media (max-width: 1280px) {
  .main-content {
    width: 100%;
  }
}
</style>
