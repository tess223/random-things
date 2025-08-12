<template>
  <div class="menu-container">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        功能菜单
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="dashboard">主页</el-dropdown-item>
          <el-dropdown-item command="profile">个人资料</el-dropdown-item>
          <el-dropdown-item command="settings">设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/utils/auth'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

const handleCommand = (command: string) => {
  switch (command) {
    case 'dashboard':
      router.push('/dashboard')
      break
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      logout()
      break
    default:
      ElMessage.warning('未知操作')
  }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
  ElMessage.success('您已退出登录')
}
</script>

<style scoped>
.menu-container {
  position: absolute;
  color: #072452;
  background-color: #fff;
  top: 15px;
  right: 15px;
  z-index: 1000;
  padding: 8px 12px; /* 缩小内边距 */
  border-radius: 6px; /* 圆角更柔和 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* 轻微阴影 */
}

.el-dropdown-link {
  font-size: 14px; /* 缩小字体 */
  cursor: pointer;
  color: #3b82f6;
  display: flex;
  align-items: center;
}

.el-icon {
  margin-left: 4px; /* 图标与文字间距 */
}
</style>