import { createRouter, createWebHistory } from "vue-router";
import Index from "../components/Index.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import VideoTo3D from "../components/VideoTo3D.vue";
import ImageTo3D from "../components/ImageTo3D.vue";
import Forum from "../components/Forum.vue";
import FileManager from "../components/FileManager.vue";
import FindPass from "@/components/FindPass.vue";

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
  history: createWebHistory(),
  routes
});

export default router;
