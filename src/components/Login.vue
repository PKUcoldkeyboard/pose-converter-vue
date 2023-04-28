<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">登录</h1>
      <a-form 
        :model = "formState"
        @finish="onFinish"
        @submit="handleLogin" 
        class="login-form">
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <user-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item :rules="[{required:true, trigger:'blur', validator:validatePassword}]">
          <a-input-password v-model:value="formState.password" placeholder="密码">
            <template #prefix>
              <lock-filled style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-button">
            登录
          </a-button>
          <div class="bottom-actions">
            <div class="bottom-actions-container">
              <a-checkbox v-model:value="formState.rememberMe">记住密码</a-checkbox>
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
import { defineComponent, reactive } from 'vue';
import { validUsername, validPassword } from '@/utils/validate';
import { setCookie, getCookie } from '@/utils/support';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    UserOutlined,
    LockFilled,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const formState = reactive({
      username: '',
      password: '',
      rememberMe: false,
    });
    const validateUsername = (value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };

    const validatePassword = (value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码为同时含有大小写字母、数字的8-16位组合'));
      } else {
        callback();
      }
    };

    const goToRegister = () => {
      router.push('/register');
    };

    const onFinish = () => {
      router.push('/');
    };

    const handleLogin = () => {
      store.dispatch('Login', {
        username: formState.username,
        password: formState.password,
        rememberMe: formState.rememberMe,
        })
        .then(() => {
          router.push('/');
        })
    };

    return {
      formState,
      validateUsername,
      validatePassword,
      goToRegister,
      onFinish,
      handleLogin,
    };
  }
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

