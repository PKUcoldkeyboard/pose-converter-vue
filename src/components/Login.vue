<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">登录</h1>
      <a-form 
        ref="formRef"
        :model="formState"
        :rules="rules"
        class="login-form">
        <a-form-item has-feedback name="username">
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <user-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item has-feedback name="password">
          <a-input-password v-model:value="formState.password" placeholder="密码">
            <template #prefix>
              <lock-filled style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" :loading="formState.loading" @click.native.prevent="handleFinish" class="login-button">
            登录
          </a-button>
          <div class="bottom-actions">
            <div class="bottom-actions-container">
              <a-checkbox v-model:checked="formState.rememberMe">记住密码</a-checkbox>
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
import { defineComponent, reactive, ref } from 'vue';
import { validUsername, validPassword } from '@/utils/validate';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    UserOutlined,
    LockFilled,
  },

  setup() {
    const formRef = ref();
    const formState = reactive({
      username: '',
      password: '',
      rememberMe: false,
      loading: false,
    });

    const store = useStore();
    const router = useRouter();

    let validateUsername = async (_rule, value) => {
      if (value == '') {
        return Promise.reject("请输入用户名");
      }
      if (validUsername(value)) {
        return Promise.resolve();
      }
      return Promise.reject("用户名长度为4至10位")
    };

    let validatePass = async (_rule, value) => {
      if (value == '') {
        return Promise.reject("请输入密码");
      }
      if (validPassword(value)) {
        return Promise.resolve();
      }
      return Promise.reject("密码为8-16位字符，且必须同时含有大小写字母、数字");
    };

    const rules = {
      username: [{
        required: true,
        validator: validateUsername,
        trigger: 'blur',
      }],
      password: [{
        required: true,
        validator: validatePass,
        trigger: 'blur',
      }]
    };

    const handleFinish = values => {
      formState.loading = true;
      let payload = {
        username: formState.username,
        password: formState.password,
      };
      store.dispatch('Login', payload).then(()=> {
        formState.loading = false;
        if (formState.rememberMe) {
          localStorage.setItem("rem:username", formState.username);
          localStorage.setItem("rem:password", formState.password);
        } else {
          localStorage.removeItem("rem:username");
          localStorage.removeItem("rem:password");
        }
        router.push('/video-to-3d');
      }).catch((error) => {
        formState.loading = false;
        console.error(error);
      })
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    const goToRegister = () => {
      if (formState.rememberMe) {
          localStorage.setItem("rem:username", formState.username);
          localStorage.setItem("rem:password", formState.password);
      } else {
          localStorage.removeItem("rem:username");
          localStorage.removeItem("rem:password");
      }
      router.push('/register')
    }
    
    return {
      formState,
      formRef,
      rules,
      handleFinish,
      handleFinishFailed,
      goToRegister
    }
  },

  created() {
    const username = localStorage.getItem('rem:username');
    const password = localStorage.getItem('rem:password');

    if (username) {
      this.formState.username = username;
      this.formState.rememberMe = true;
    }
    if (password) {
      this.formState.password = password;
    }
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

