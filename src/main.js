import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import antdV from 'ant-design-vue';
import "ant-design-vue/dist/antd.variable.min.css";

createApp(App)
  .use(router)
  .use(store)
  .use(antdV)
  .mount("#app");
