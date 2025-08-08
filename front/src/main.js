import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import App from './App.vue'
import router from './router' 
import { useAuthStore } from '@/utils/auth'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)
const authStore = useAuthStore()
app.mount('#app')