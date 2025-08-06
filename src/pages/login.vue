<template> 
  <div class="nb-login-wrapper">
    <div class="nb-login-header">
      <h2>Sign In</h2>
    </div>
    <form class="nb-login-form" @submit.prevent="handleSubmit">
      <div class="nb-form-group center-input">
        <label for="nb-username" class="nb-form-label">用户名</label>
        <input
          type="text"
          id="nb-username"
          class="nb-input"
          v-model="form.username"
          placeholder="请输入用户名"
          :class="{ 'is-invalid': errors.username }"
          required
        />
        <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
      </div>

      <div class="nb-form-group center-input">
        <label for="nb-password" class="nb-form-label">密码</label>
        <input
          type="password"
          id="nb-password"
          class="nb-input"
          v-model="form.password"
          placeholder=""
          :class="{ 'is-invalid': errors.password }"
          required
        />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <button type="submit" class="nb-btn-submit" :disabled="loading" @click="handleSubmit">
        <span v-if="!loading">Login</span>
        <span v-else>登录中...</span>
      </button>
    </form>

    <div class="nb-login-footer">
      没有账号？<router-link to="/register">注册</router-link>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const form = ref({ username: '', password: '' })
    const errors = ref({ username: '', password: '' })
    const loading = ref(false)


    const validateForm = () => {
      let isValid = true
      errors.value = { username: '', password: '' }

      if (!form.value.username.trim()) {
        errors.value.username = '请输入用户名'
        isValid = false
      }

      if (!form.value.password) {
        errors.value.password = '请输入密码'
        isValid = false
      } 

      return isValid
    }

    const handleSubmit = async () => {
      if (!validateForm()) return
      loading.value = true

      try {
        await authStore.login({
            username: form.value.username,
            password: form.value.password
        })
        router.push('/dashboard')
      } catch (error) {
        alert(error.message || '登录失败')
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      loading,
      handleSubmit
    }
  }
}
</script>
<style>
:root {
  --nb-white: #ffffff;
  --nb-blue: #3b82f6;
  --nb-blue-dark: #1e40af;
  --nb-gray-900: #111827;
  --nb-gray-700: #374151;
  --nb-gray-100: #f3f4f6;
  --nb-font-mono: 'IBM Plex Mono', monospace;
  --nb-shadow-neo: 4px 4px 0 var(--nb-gray-900);
  --nb-transition: 0.2s ease;
}
</style>
<style scoped>
.nb-login-wrapper {
  width: 400px;
  padding: 16px;
  background: var(--nb-white);
  border: 4px solid var(--nb-gray-900);
  border-radius: 4px;
  box-shadow: var(--nb-shadow-neo);
  transition: all 0.5s ease;
  margin: 5% auto;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nb-login-header {
  margin-bottom: 16px;
  text-align: center;
}

.nb-login-header h2 {
  font-size: 25px;
  margin: 0;
  color: var(--nb-gray-900);
}

.nb-login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nb-form-group {
  display: flex;
  flex-direction: column;
}

.center-input {
  align-items: center;
}

.nb-form-label {
  font-weight: bold;
  color: var(--nb-gray-900);
  margin-bottom: 4px;
}

.nb-input {
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border: 3px solid var(--nb-gray-900);
  background-color: var(--nb-gray-100);
  font-size: 14px;
  font-family: var(--nb-font-mono);
}

.nb-btn-submit {
  padding: 8px 16px;
  background-color: var(--nb-blue);
  color: var(--nb-white);
  font-weight: bold;
  font-size: 14px;
  border: 3px solid var(--nb-gray-900);
  cursor: pointer;
  box-shadow: var(--nb-shadow-neo);
}

.nb-btn-submit:hover {
  background-color: var(--nb-white);
  color: var(--nb-blue-dark);
  border-color: var(--nb-blue-dark);
}

.nb-login-footer {
  margin-top: 12px;
  text-align: center;
  font-size: 12px;
  color: var(--nb-gray-700);
}

.nb-login-footer a {
  color: var(--nb-blue-dark);
  text-decoration: underline;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}
</style>
