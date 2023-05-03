import axios from 'axios';
import store from '@/store';
import { getToken } from './auth';
import {message, Modal} from 'ant-design-vue';

const baseURL = 'http://localhost:8058/api'; // API 接口地址

const api = axios.create({
  baseURL,
  withCredentials: true, // 允许跨域携带 cookie
  timeout: 30000,
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
    if (res.code != 200) {
      message.error(res.msg);
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
    message.error(error.message)
    return Promise.reject(error);
  }
)

export default api;
