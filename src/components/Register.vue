<template>
  <div class="register-page">
    <div class="register-container">
      <h1 class="register-title">注册</h1>
      <a-form ref="formRef" :model="formState" :rules="rules" @finish="handleRegister" class="register-form">
        <a-form-item has-feedback name="username">
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <user-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item has-feedback name="email">
          <a-input v-model:value="formState.email" placeholder="邮箱">
            <template #prefix>
              <mail-outlined style="color: rgba(0, 0, 0, 0.45)" />
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
        <a-form-item has-feedback name="confirmPass">
          <a-input-password v-model:value="formState.confirmPass" placeholder="确认密码">
            <template #prefix>
              <lock-filled style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" :loading="formState.loading" html-type="submit" class="register-button">
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
import { register } from '@/api/user';
import { validEmail, validPassword, validUsername } from '@/utils/validate';
import { UserOutlined, LockFilled, MailOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    UserOutlined,
    LockFilled,
    MailOutlined,
  },

  setup() {
    const formRef = ref();
    const formState = reactive({
      username: '',
      email: '',
      password: '',
      confirmPass: '',
      loading: false,
    });

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

    let validateConfirmPass = async (_rule, value) => {
      if (value == '') {
        return Promise.reject("请再次输入密码");
      }
      if (value === formState.password) {
        return Promise.resolve();
      }
      return Promise.reject("两次输入密码不一致");
    };

    let validateEmail = async (_rule, value) => {
      if (value == '') {
        return Promise.reject("请输入邮箱");
      }
      if (validEmail(value)) {
        return Promise.resolve();
      }
      return Promise.reject("请输入正确的邮箱");
    };

    const rules = {
      username: [{
        required: true,
        validator: validateUsername,
        trigger: 'blur'
      }],
      password: [{
        required: true,
        validator: validatePass,
        trigger: 'blur'
      }],
      confirmPass: [{
        required: true,
        validator: validateConfirmPass,
        trigger: 'blur'
      }], email: [{
        required: true,
        validator: validateEmail,
        trigger: 'blur'
      }]
    };

    const handleRegister = () => {
      formState.loading = true;
      register(formState.username, formState.password).then(() => {
        formState.loading = false;
        localStorage.setItem("username", formState.username);
        localStorage.setItem("password", formState.password);
        router.push('/login');
      }).catch(error => {
        formState.loading = false;
        console.log(error);
      });
    }
    return {
      formRef,
      formState,
      rules,
      handleRegister
    }
  }
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
