import axios from 'axios';
import store from '@/store';
import { getToken } from './auth';
import {message, Modal} from 'ant-design-vue';

const baseURL = 'https://localhost:8058/api'; // API 接口地址

const api = axios.create({
  baseURL,
  withCredentials: true, // 允许跨域携带 cookie
  timeout: 15000,
});

api.interceptors.request.use(config => {
  // 携带JWT请求头
  if (store.getters.token) {
    config.headers['sa-token'] = getToken();
  }
  return config;
}, error => {
  Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      message.error({
        content: res.message,
        duration: 3
      });
      // 401: 未登录
      if (res.code == 401) {
        Modal.confirm({
          content: '登录已过期，是否重新登录？',
          okText: '重新登录',
          cancelText: '取消',
          onOk: () => {
            store.dispatch('user/resetToken').then(() => {
              location.reload();
            });
          }
        })
      }
      return Promise.reject('error')
    } else {
      return response.data;
    }
  },
  error => {
    message.error({
      content: error.message,
      duration: 3,
    })
    return Promise.reject(error);
  }
)

// 封装 GET 请求方法
export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 封装 POST 请求方法
export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 封装 Put 请求方法
export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const del = async (url, data = {}) => {
  try {
    const response = await api.delete(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
