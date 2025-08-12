const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// JWT密钥（实际项目中应该放在环境变量中）
const JWT_SECRET = 'your-secret-key';

/**
 * @api {post} /users/register 用户注册
 * @apiName Register
 * @apiGroup User
 *
 * @apiBody {String} username 用户名（必填）
 * @apiBody {String} password 密码（必填）
 * @apiBody {String} [email] 邮箱（可选）
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 返回提示信息
 * @apiSuccess {Object} data 返回的用户数据和 token
 * @apiSuccess {Object} data.user 用户信息
 * @apiSuccess {String} data.user.id 用户 ID
 * @apiSuccess {String} data.user.username 用户名
 * @apiSuccess {String} [data.user.email] 用户邮箱
 * @apiSuccess {Date} data.user.createdAt 用户创建时间
 * @apiSuccess {String} data.token 用户认证令牌
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '用户名已存在'
      });
    }

    const user = new User({ username, password, email });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

/**
 * @api {post} /users/login 用户登录
 * @apiName Login
 * @apiGroup User
 *
 * @apiBody {String} username 用户名（必填）
 * @apiBody {String} password 密码（必填）
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 返回提示信息
 * @apiSuccess {Object} data 返回的用户数据和 token
 * @apiSuccess {Object} data.user 用户信息
 * @apiSuccess {String} data.user.id 用户 ID
 * @apiSuccess {String} data.user.username 用户名
 * @apiSuccess {String} [data.user.email] 用户邮箱
 * @apiSuccess {String} data.token 用户认证令牌
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '用户名或密码错误'
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

/**
 * @api {get} /users/profile 获取用户信息
 * @apiName GetProfile
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Bearer token字符串
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 返回提示信息
 * @apiSuccess {Object} data 返回的用户数据
 * @apiSuccess {Object} data.user 用户信息
 * @apiSuccess {String} data.user.id 用户 ID
 * @apiSuccess {String} data.user.username 用户名
 * @apiSuccess {String} [data.user.email] 用户邮箱
 * @apiSuccess {Date} data.user.createdAt 用户创建时间
 */
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }

    res.json({
      success: true,
      message: '获取用户信息成功',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(401).json({
      success: false,
      message: '无效的认证令牌'
    });
  }
});

/**
 * @api {get} /users 获取所有用户
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 返回提示信息
 * @apiSuccess {Object} data 返回的用户数据
 * @apiSuccess {Object[]} data.users 用户列表
 * @apiSuccess {String} data.users[].id 用户 ID
 * @apiSuccess {String} data.users[].username 用户名
 * @apiSuccess {String} [data.users[].email] 用户邮箱
 * @apiSuccess {Date} data.users[].createdAt 用户创建时间
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      message: '获取用户列表成功',
      data: { users }
    });
  } catch (error) {
    console.error('获取用户列表错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

module.exports = router;
