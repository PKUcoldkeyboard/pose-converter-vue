<template>
    <div class="reset-password-page">
        <div class="reset-password-container">
            <h1 class="reset-password-title">找回密码</h1>
            <a-form @submit="handleSubmit" class="reset-password-form">
                <a-form-item>
                    <a-input v-model="email" placeholder="邮箱">
                        <template #prefix>
                            <mail-outlined style="color: rgba(0, 0, 0, 0.45)" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" class="reset-password-button">
                        发送重置密码邮件
                    </a-button>
                </a-form-item>
            </a-form>
            <router-link to="/login" class="back-to-login">返回登录</router-link>
        </div>
    </div>
</template>
  
<script>
import { MailOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        MailOutlined,
    },

    data() {
        return {
            email: '',
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            // 提交找回密码表单
        },
    },
});
</script>
  
<style scoped>
.reset-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.reset-password-container {
    width: 400px;
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reset-password-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 24px;
}

.reset-password-form {
    width: 100%;
}

.reset-password-form .reset-password-button {
    width: 100%;
    margin-bottom: 12px;
}

.reset-password-form .a-form-item {
    margin-bottom: 16px;
}

.reset-password-form .a-input {
    padding-left: 36px;
}

.back-to-login {
    display: block;
    text-align: center;
    color: #1890ff;
    text-decoration: none;
    margin-top: 12px;
}
</style>
  