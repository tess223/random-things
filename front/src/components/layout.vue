<template>
  <div class="common-layout h-screen">
    <el-container style="height: 100%;">
      <!-- 左侧导航栏 -->
      <el-aside width="200px" class="bg-white shadow-md overflow-auto">
       <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
       </el-scrollbar>
      </el-aside>

      <!-- 右侧主体区域 -->
      <el-container direction="vertical">
        <!-- 顶部 Header -->
        <el-header height="60px" class="bg-white shadow-md flex items-center px-4">
          <slot name="header">
            <h1 class="text-xl font-semibold text-gray-800">默认标题</h1>
          </slot>
        </el-header>

        <!-- 中部内容 + 菜单 -->
        <el-container>
          <el-main class="bg-gray-50 p-6 overflow-auto relative">
            <div class="flex">
              <!-- 主内容 -->
              <div class="flex-1 mr-4">
                <slot />
              </div>

              <!-- Sticky 菜单 -->
               <MenuComponent />
            </div>
          </el-main>
        </el-container>

        <!-- Footer -->
        <el-footer height="50px" class="text-center text-gray-500 bg-white shadow-inner">
          <slot name="footer">© 2025 Tess's Blog. All rights reserved.</slot>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// 通用布局组件不需要逻辑
import MenuComponent from './menus.vue'
</script>

<style scoped>
.common-layout {
  height: 100vh;
  overflow: hidden;
}
</style>
