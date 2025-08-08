import request from './index.js';

export function login(data) {
  return request({
    url: '/users/login', // 修改为正确的端点
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/users/register', // 修改为正确的端点
    method: 'post',
    data
  })
}

export function getProfile() {
  return request({
    url: '/users/profile', // 修改为正确的端点
    method: 'get',
  })
}

