import dotenv from 'dotenv';
dotenv.config(); // 确保这行在所有其他 import 之前

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './config/db.js'; // 这会执行 db.js 中的连接逻辑

// 路由
import userRoutes from './routes/user.js';
import moodRoutes from './routes/mood.js';
import aiRoutes from './routes/ai.js'; // 引入AI路由

const app = express();
const PORT = process.env.PORT || 3333;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 注册路由
app.use('/api/users', userRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/ai', aiRoutes); // 使用AI路由

// 基础路由
app.get('/', (req, res) => {
  res.json({ 
    message: 'API服务器运行中',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      profile: 'GET /api/users/profile',
      users: 'GET /api/users/users',
      moods: {
        create: 'POST /api/moods',
        list: 'GET /api/moods',
        delete: 'DELETE /api/moods/:id'
      },
      ai: 'POST /api/ai/ask'
    }
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: '服务器内部错误' 
  });
});

// 404处理
app.all('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '接口不存在' 
  });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

export default app; // 使用 export default
