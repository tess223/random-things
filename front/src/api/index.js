import axios from 'axios';
import { useAuthStore } from '@/utils/auth';

const service = axios.create({
  baseURL: 'http://localhost:3322/api', // 修改端口为 3333
  timeout: 5000
});

service.interceptors.request.use(config => { 
    const authStore = useAuthStore();
    if(authStore.token){
        config.headers.Authorization = `Bearer ${authStore.token}`;
        console.log(config.headers.Authorization);
    }
    return config;
})

service.interceptors.response.use(
  res => res.data,
  err => {
    console.error('API Error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);
export default service;
