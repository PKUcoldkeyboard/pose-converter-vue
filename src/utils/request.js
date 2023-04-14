import axios from 'axios';

const baseURL = 'https://api.example.com'; // API 接口地址

const api = axios.create({
  baseURL,
  withCredentials: true, // 允许跨域携带 cookie
  timeout: 15000,
});

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

// 其他请求方法的封装同理，比如 PUT、DELETE 等

export default api;
