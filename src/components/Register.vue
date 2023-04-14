<template>
  <div class="register-page">
    <div class="register-container">
      <h1 class="register-title">注册</h1>
      <a-form @submit="handleSubmit" class="register-form">
        <a-form-item>
          <a-input v-model="username" placeholder="用户名">
            <template #prefix>
              <user-outlined type="user" style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="email" placeholder="邮箱">
            <template #prefix>
              <mail-outlined style="color: rgba(0, 0, 0, 0.45)" />
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
          <a-input v-model="confirmPassword" type="password" placeholder="确认密码">
            <template #prefix>
              <lock-filled style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="register-button">
            注册
          </a-button>
          <div class="bottom-actions">
            <div class="bottom-actions-container">
              <router-link to="/login">返回登录</router-link>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { UserOutlined, LockFilled, MailOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    UserOutlined,
    LockFilled,
    MailOutlined,
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      // 提交注册表单
    },
  },
});
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-container {
  width: 400px;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.register-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
}

.register-form {
  width: 100%;
}

.register-form .register-button {
  width: 100%;
  margin-bottom: 8px;
}

.register-form .a-form-item {
  margin-bottom: 16px;
}

.register-form .a-input {
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
