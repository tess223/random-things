import express from 'express';

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    // 1. 验证 API Key 是否存在
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY 未在 .env 文件中配置');
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: question }],
        // 添加 stream: false 确保非流式响应
        stream: false,
      }),
    });

    // 2. 检查 HTTP 响应状态
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`DeepSeek API 请求失败，状态码: ${response.status}, 响应: ${errorBody}`);
    }

    const data = await response.json();

    // 3. 打印完整的 API 响应，方便调试
    console.log('DeepSeek API 响应:', JSON.stringify(data, null, 2));

    // 4. 更健rott的错误检查
    if (data.error) {
        throw new Error(`DeepSeek API 返回错误: ${data.error.message || JSON.stringify(data.error)}`);
    }

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message?.content) {
      throw new Error(`DeepSeek API 返回数据不完整或格式不正确`);
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    // 5. 在控制台打印更详细的错误信息
    console.error('AI 接口处理出错:', error.message);
    // 向前端返回清晰的错误信息，注意这里我将 `error` 改为了 `message`
    res.status(500).json({ message: error.message });
  }
});

export default router;
