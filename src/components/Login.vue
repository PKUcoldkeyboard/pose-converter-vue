<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">登录</h1>
      <a-form @submit="handleSubmit" class="login-form">
        <a-form-item>
          <a-input v-model="username" placeholder="用户名">
            <template #prefix>
              <user-outlined type="user" style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="password" type="password" placeholder="密码">
            <template #prefix>
              <lock-filled style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-button">
            登录
          </a-button>
          <div class="bottom-actions">
            <div class="bottom-actions-container">
              <a-checkbox v-model="rememberMe">记住密码</a-checkbox>
              <a-button type="dashed" @click="goToRegister">立即注册</a-button>
              <router-link to="/find-pwd">找回密码</router-link>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  UserOutlined,
  LockFilled,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    UserOutlined,
    LockFilled,
  },

  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      // 提交登录表单
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
});
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-container {
  width: 400px;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
}

.login-form {
  width: 100%;
}

.login-form .forgot-password {
  float: right;
  color: #1890ff;
  cursor: pointer;
}

.login-form .login-button {
  width: 100%;
  margin-bottom: 8px;
}

.login-form .a-form-item {
  margin-bottom: 16px;
}

.login-form .a-input {
  padding-left: 36px;
}

.bottom-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.bottom-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.bottom-actions-container router-link {
  margin: 0 8px;
}
</style>

