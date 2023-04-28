<template>
  <div class="navbar">
    <div class="container">
      <div class="logo">
        <router-link to="/">Pose Converter</router-link>
      </div>
      <nav>
        <ul class="menu">
          <li>
            <router-link to="/video-to-3d" class="nav-link">视频转3D</router-link>
          </li>
          <li>
            <router-link to="/image-to-3d" class="nav-link">图片转3D</router-link>
          </li>
          <li>
            <router-link to="/forum" class="nav-link">论坛</router-link>
          </li>
          <li>
            <router-link to="/file-manager" class="nav-link">文件管理</router-link>
          </li>
        </ul>
      </nav>
      <div class="auth-buttons">
        <a-button type="primary" shape="round" class="register-button" :disabled="isLoggedIn">{{ isLoggedIn ? `Username: ${username}` : '未登录' }}</a-button>
        <a-button v-if="!isLoggedIn" type="link" class="login-button" @click="goToLogin">登录</a-button>
        <a-button v-if="!isLoggedIn" type="primary" shape="round" class="register-button" @click="goToRegister">注册</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
export default defineComponent ({
  computed: {
    ...mapGetters(['isLoggedIn', 'username'])
  },
  methods: {
    goToRegister() {
      this.$router.push('/register');
    },
    goToLogin() {
      this.$router.push('/login');
    },
  }
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%; 
  background-color: #fff;
  padding: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #0084ff;
}

nav ul.menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

nav ul.menu li {
  margin-right: 16px;
}

nav ul.menu li:last-child {
  margin-right: 0;
}

nav ul.menu li a.nav-link {
  position: relative;
  text-decoration: none;
  color: #666;
  font-size: 16px;
  padding-bottom: 4px;
}

nav ul.menu li a.nav-link.router-link-exact-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #0084ff;
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.auth-buttons .login-button {
  color: #0084ff;
  font-weight: 600;
  font-size: 16px;
}

.auth-buttons .register-button {
  background-color: #0084ff;
  border-color: #0084ff;
  font-weight: 600;
  font-size: 16px;
}
</style>