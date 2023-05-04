import { getToken } from "@/utils/auth";
import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("../components/Index.vue");
const Login = () => import("../components/Login.vue");
const Register = () => import("../components/Register.vue");
const VideoTo3D = () => import("../components/VideoTo3D.vue");
const ImageTo3D = () => import("../components/ImageTo3D.vue");
const Forum = () => import("../components/Forum.vue");
const FileManager = () => import("../components/FileManager.vue");
const FindPass = () => import("@/components/FindPass.vue");

const routes = [
  { path: "/", component: Index },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/video-to-3d", component: VideoTo3D },
  { path: "/image-to-3d", component: ImageTo3D },
  { path: "/forum", component: Forum },
  { path: "/file-manager", component: FileManager },
  { path: "/find-pwd", component: FindPass },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from ,next) => {
  // 检查是否登录
  const token = localStorage.getItem('token') || '';
  if ((to.path === '/login' || to.path === '/register' || to.path == '/find-pwd') && token) {
    next('/video-to-3d');
  } else {
    next();
  }
})

export default router;
