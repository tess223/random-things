const mongoose = require('mongoose');
const User = require('./models/user');
require('./config/db');

async function createAdminUser() {
  try {
    // 检查是否已存在管理员用户
    const existingAdmin = await User.findOne({ username: 'user' });
    
    if (existingAdmin) {
      console.log('管理员用户已存在');
      return;
    }

    // 创建管理员用户
    const adminUser = new User({
      username: 'user',
      password: '123456',
      email: 'admin@example.com'
    });

    await adminUser.save();
    console.log('管理员用户创建成功:');
    console.log('用户名: user');
    console.log('密码: 123456');
    
  } catch (error) {
    console.error('创建管理员用户失败:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdminUser();