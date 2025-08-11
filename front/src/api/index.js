import axios from 'axios';
import { useAuthStore } from '@/utils/auth';

const service = axios.create({
  baseURL: 'http://localhost:3333/api', // 修改端口为 3333
  timeout: 5000
});

service.interceptors.request.use(config => { 
    const authStore = useAuthStore();
    if(authStore.token){
        config.headers.Authorization = `Bearer ${authStore.token}`;
        console.log('发送请求:', config.url, config.headers.Authorization);
    }
    return config;
})

service.interceptors.response.use(
  res => {
    console.log('API响应:', res);
    return res.data;
  },
  err => {
    console.error('API Error:', err.response?.data || err.message);
    console.error('请求URL:', err.config?.url);
    console.error('请求方法:', err.config?.method);
    return Promise.reject(err);
  }
);

export default service;
