<template> 
  <div class="nb-login-wrapper">
    <div class="nb-login-header">
      <h2>注册账号</h2>
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
        <label for="nb-email" class="nb-form-label">电子邮箱</label>
        <input
          type="email"
          id="nb-email"
          class="nb-input"
          v-model="form.email"
          placeholder="请输入电子邮箱"
          :class="{ 'is-invalid': errors.email }"
          required
        />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="nb-form-group center-input">
        <label for="nb-password" class="nb-form-label">密码</label>
        <input
          type="password"
          id="nb-password"
          class="nb-input"
          v-model="form.password"
          placeholder="请输入密码"
          :class="{ 'is-invalid': errors.password }"
          required
        />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <div class="nb-form-group center-input">
        <label for="nb-confirm-password" class="nb-form-label">确认密码</label>
        <input
          type="password"
          id="nb-confirm-password"
          class="nb-input"
          v-model="form.confirmPassword"
          placeholder="请再次输入密码"
          :class="{ 'is-invalid': errors.confirmPassword }"
          required
        />
        <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>
      </div>

      <button type="submit" class="nb-btn-submit" :disabled="loading">
        <span v-if="!loading">注册</span>
        <span v-else>注册中...</span>
      </button>
    </form>

    <div class="nb-login-footer">
      已有账号？<router-link to="/login">登录</router-link>
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

    const form = ref({ 
      username: '', 
      email: '',
      password: '', 
      confirmPassword: '' 
    })
    
    const errors = ref({ 
      username: '', 
      email: '',
      password: '', 
      confirmPassword: '' 
    })
    
    const loading = ref(false)

    const validatePassword = (pwd) => pwd.length >= 6 && pwd.length <= 20
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const validateForm = () => {
      let isValid = true
      errors.value = { 
        username: '', 
        email: '',
        password: '', 
        confirmPassword: '' 
      }

      if (!form.value.username.trim()) {
        errors.value.username = '请输入用户名'
        isValid = false
      }

      if (!form.value.email) {
        errors.value.email = '请输入电子邮箱'
        isValid = false
      } else if (!validateEmail(form.value.email)) {
        errors.value.email = '请输入有效的电子邮箱'
        isValid = false
      }

      if (!form.value.password) {
        errors.value.password = '请输入密码'
        isValid = false
      } else if (!validatePassword(form.value.password)) {
        errors.value.password = '密码长度需6-20位'
        isValid = false
      }

      if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = '两次输入的密码不一致'
        isValid = false
      }

      return isValid
    }

    const handleSubmit = async () => {
      if (!validateForm()) return
      loading.value = true

      try {
        await authStore.register({
          username: form.value.username,
          email: form.value.email,
          password: form.value.password
        })
        router.push('/login')
      } catch (error) {
        alert(error.message || '注册失败')
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