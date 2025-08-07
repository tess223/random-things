// stores/auth.js
import { defineStore } from 'pinia' 
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(credentials) {
      // 临时模拟接口，无需 fetch
      if (
        credentials.username === 'user' &&
        credentials.password === '123456'
      ) {
        this.user = { username: 'user' }
        this.token = 'mocked-token'
        localStorage.setItem('token', this.token)
        return
      }

      throw new Error('用户名或密码错误')
    },

    init() {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        this.token = savedToken
        this.user = { username: 'user' } // 简化处理，实际应该从token解析或请求用户信息
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
