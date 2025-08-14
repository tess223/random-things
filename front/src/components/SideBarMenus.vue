<template>
  <el-aside width="200px" class="bg-white shadow-md overflow-auto">
    <el-scrollbar>
      <el-menu 
        :default-openeds="['1','2']" 
        :default-active="activeMenu"
        @select="handleMenuSelect"
      >
        <!-- Dashboard 菜单项 -->
        <el-menu-item index="0">
          <el-icon><House /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>

        <!-- 导航菜单1 -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Message /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="1-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>Option 4</template>
            <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 导航菜单2 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>Navigator Two</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">AI Chat</el-menu-item>
            <el-menu-item index="2-2">Spinner</el-menu-item>

          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="2-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>Option 4</template>
            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 导航菜单3 -->
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>Navigator Three</span>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  House,
  Message,
  Menu,
  Setting
} from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('0') // 默认激活的菜单项为 Dashboard

// 菜单选择处理
const handleMenuSelect = (index) => {
  console.log('Selected menu:', index)
  switch (index) {
    case '0': // Dashboard
      router.push('/dashboard')
      break
    case '1-1': // Option 1
      router.push('/option1')
      break
    case '1-2': // Option 2
      router.push('/option2')
      break
    case '2-1': 
      router.push('/aichat')
      break
    case '2-2': // Spinner
      router.push('/spinner')
      break
    default:
      ElMessage.warning('未知操作')
  }
}
</script>

<style scoped>
/* 自定义样式 */
</style>