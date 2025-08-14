<template>
  <div class="card">
    <span class="card__title">AI 问答</span>
    <form class="card__form" @submit.prevent="submitQuestion">
      <textarea v-model="question" placeholder="输入你的问题..." required></textarea>
      <button class="card__button">发送</button>
    </form>

    <div v-if="isLoading" style="margin-top:20px;">
      <p>AI 正在思考中...</p>
    </div>
    <div v-if="answer" style="margin-top:20px;">
      <h3>AI 回复：</h3>
      <p>{{ answer }}</p>
    </div>
    <div v-if="error" style="margin-top:20px; color: red;">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 1. 移除直接的 axios 引入
// import axios from 'axios';
// 2. 引入封装好的 API 函数
import { askAI as apiAskAI } from '@/api/ai';

const question = ref('');
const answer = ref('');
const isLoading = ref(false);
const error = ref('');

async function submitQuestion() {
  if (!question.value.trim()) return;

  isLoading.value = true;
  answer.value = '';
  error.value = '';

  try {
    // 3. 使用封装的函数
    const res = await apiAskAI(question.value);
    if (res && res.reply) {
      answer.value = res.reply;
    } else {
      throw new Error('AI未能返回有效的回复');
    }
  } catch (err) {
    console.error('AI请求失败:', err);
    error.value = err.response?.data?.message || err.message || '与AI通信时发生错误';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* 样式保持不变 */
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
</style>
