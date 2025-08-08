// stores/auth.js
import { defineStore } from 'pinia' 
import { login, register, getProfile } from '@/api/user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
  }),
  actions: {
    // 修改方法名为 login
    async login(credentials) {
      try {
        const res = await login(credentials);
        if (res.success) {
          this.token = res.data.token;
          this.userInfo = res.data.user;
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userInfo', JSON.stringify(res.data.user));
          return res;
        } else {
          throw new Error(res.message || '登录失败');
        }
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || '登录失败');
      }
    },
    // 修改方法名为 register
    async register(data) {
      try {
        const res = await register(data);
        if (res.success) {
          return res;
        } else {
          throw new Error(res.message || '注册失败');
        }
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || '注册失败');
      }
    },
    async getProfileAction() {
      try {
        const res = await getProfile();
        this.userInfo = res.data.user;
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    },
    logout() {
      this.token = '';
      this.userInfo = {};
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    user: (state) => state.userInfo
  }
});