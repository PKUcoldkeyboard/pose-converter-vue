<template>
    <div class="reset-password-page">
        <div class="reset-password-container">
            <h1 class="reset-password-title">找回密码</h1>
            <a-form ref="formRef" :model="formState" :rules="rules" @finish="handleReset" class="reset-password-form">
                <a-form-item has-feedback name="email">
                    <a-input v-model:value="formState.email" placeholder="邮箱">
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
import { Modal } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    components: {
        MailOutlined,
    },

    setup() {
        const formRef = ref();
        const formState = reactive({
            email: '',
            loading: false,
        });

        let validateEmail = async (rule, value) => {
            if (!value) {
                return Promise.reject('请输入邮箱');
            }
            if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                return Promise.reject('请输入正确的邮箱');
            }
            return Promise.resolve();
        };

        const rules = {
            email: [{required: true, validator: validateEmail, trigger: 'blur' }],
        };

        const handleReset = () => {
            formState.loading = true;
            // 实际不执行，timeout 2秒后提示成功
            setTimeout(() => {
                formState.loading = false;
                formRef.value.resetFields();
                Modal.success({
                    title: '重置密码邮件已发送',
                    content: '请注意查收',
                });
            }, 2000);
        }

        return {
            formRef,
            formState,
            rules,
            handleReset,
        }
    }
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
  