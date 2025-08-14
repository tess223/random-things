<template>
  <Layout>
    <!-- Header -->
    <template #header>
      <h1 class="text-2xl font-bold text-gray-800">MOOD</h1>
    </template>

    <!-- 主体 -->
    <template #default>
      <div class="card">
        <span class="card__title">How's your mood today?</span>
        <form class="card__form" @submit.prevent="addMood">
          <input v-model="newMood.date" type="date" required />
          <input v-model="newMood.feeling" type="text" placeholder="Mood" required />
          <textarea v-model="newMood.content" placeholder="content" required></textarea>
          <button class="card__button">save</button>
        </form>
      </div>

      <!-- 展示记录 -->
      <div v-if="moods.length" style="margin-top: 20px;">
        <h2>History</h2>
        <div class="history-list">
          <div v-for="(mood, index) in moods" :key="index" class="card history-card">
            <span class="card__title">{{ mood.date }} - {{ mood.feeling }}</span>
            <p class="card__content">{{ mood.content }}</p>
            <button class="delete-btn" @click="deleteMood(mood._id)">删除</button>

          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import Layout from '@/components/layout.vue'
import { ref, onMounted } from 'vue'
// 1. 移除直接的 axios 引入
// import axios from 'axios' 
// 2. 引入封装好的 API 函数
import { getMoods, addMood as apiAddMood, deleteMood as apiDeleteMood } from '@/api/mood'

const moods = ref([])
const newMood = ref({
  date: '',
  feeling: '',
  content: ''
})

// 3. 移除错误的 API_URL
// const API_URL = 'http://localhost:5000/api/moods'

// 获取数据
async function loadMoods() {
  try {
    const res = await getMoods() // 使用封装的函数
    moods.value = res
  } catch (error) {
    console.error("获取心情记录失败:", error);
  }
}

// 添加记录
async function addMood() {
  try {
    const res = await apiAddMood(newMood.value) // 使用封装的函数
    moods.value.unshift(res) // 添加到列表顶部
    newMood.value = { date: '', feeling: '', content: '' }
  } catch (error) {
    console.error("记录心情失败:", error);
  }
}

// 删除记录
async function deleteMood(id) {
  try {
    await apiDeleteMood(id) // 使用封装的函数
    moods.value = moods.value.filter(m => m._id !== id)
  } catch (error) {
    console.error("删除心情记录失败:", error);
  }
}

// 初始化时加载数据
onMounted(loadMoods)
</script>


<style scoped>
.card {
  width: 50%;
  padding: 20px;
  background: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translate(-5px, -5px);
  box-shadow: 17px 17px 0 #000;
}
.card__title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}
.card__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card__form input,
.card__form textarea {
  padding: 8px;
  border: 2px solid #000;
  font-size: 14px;
}
.card__button {
  border: 2px solid #000;
  background: #000;
  color: #fff;
  padding: 8px;
  cursor: pointer;
}
.history-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}
.history-card {
  position: relative;
}
.delete-btn {
  border: 2px solid red;
  background: red;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
}
.delete-btn:hover {
  background: darkred;
}
</style>
