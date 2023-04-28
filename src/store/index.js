import { login } from "@/api/login";
import { removeToken, setToken } from "@/utils/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    // 在这里定义你的状态
    token: '',
    username: '',
    userId: '',
  },
  mutations: {
    // 在这里定义你的状态变更函数
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
    }
  },
  actions: {
    // 在这里定义你的异步操作
    Login({ commit }, payload) {
        const username = payload.username.trim();
        return new Promise((resolve, reject) => {
          login(username, payload.password).then(response => {
            const data = response.data;
            const token = "Bearer " + data.token;
            setToken(token);
            commit('SET_TOKEN', token);
            resolve();
          }).catch(error => {
            reject(error);
          })
      })
    },
    // 前端登出
    FedLogout({ commit }) {
        return new Promise(resolve => {
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
      })
    },
  },
  getters: {
    // 在这里定义你的状态获取函数
    isLoggedin: state => {
      return state.token !== '';
    },
    username: state => {
      return state.username;
    },
    userId: state => {
      return state.userId;
    }
  }
});

export default store;
