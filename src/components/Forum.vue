<template>
    <div class="forum-page">
      <div class="container">
        <h1 class="forum-title">论坛</h1>
        <div class="forum-content">
          <div class="forum-posts">
            <div v-for="post in posts" :key="post.id" class="forum-post">
              <h2>{{ post.title }}</h2>
              <p>{{ post.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        posts: [
          {
            id: 1,
            title: "关于视频转3D的问题",
            content: "最近我在使用Pose Converter进行视频转3D的操作，发现生成的3D姿态视频模型有点模糊，不知道怎么调整，有没有其他人遇到过这个问题呢？",
          },
          {
            id: 2,
            title: "图片转3D的效果不错",
            content: "我使用Pose Converter进行图片转3D，发现效果非常好，生成的3D姿态模型非常精细，和原图很像，大家可以试试。",
          },
          {
            id: 3,
            title: "分享一个3D姿态模型",
            content: "我最近使用Pose Converter生成了一个非常酷的3D姿态模型，可以分享给大家一下，有兴趣的可以私信我。",
          },
        ],
      };
    },
  });
  </script>
  
  <style scoped>
  .forum-page {
    margin-top: 72px;
    background-color: #f5f5f5;
    min-height: calc(100vh - 72px);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
  
  .forum-title {
    font-size: 32px;
    font-weight: bold;
    color: #0084ff;
    margin-bottom: 24px;
  }
  
  .forum-content {
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .forum-posts {
    margin-top: 24px;
  }
  
  .forum-post {
    margin-bottom: 24px;
  }
  
  .forum-post h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .forum-post p {
    color: #666;
  }
  </style>
  