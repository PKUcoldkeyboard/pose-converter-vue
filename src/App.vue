<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  components: {
    Navbar
  }
});

</script>

<style>
/* 在这里添加全局样式 */
</style>
