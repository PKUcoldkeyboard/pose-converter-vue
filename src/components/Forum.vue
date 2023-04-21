<template>
  <div class="forum-page">
    <div class="container">
      <div class="forum-header">
        <h1 class="forum-title">论坛</h1>
        <button class="create-post-button" @click="toggleCreatePostForm">发帖</button>
      </div>
      <div class="forum-content">
        <div v-if="createPostFormVisible" class="create-post-form">
          <input v-model="newPost.title" placeholder="帖子标题" />
          <textarea v-model="newPost.content" placeholder="帖子内容"></textarea>
          <button @click="submitNewPost">发布</button>
        </div>
        <div class="forum-posts">
          <div v-for="post in posts" :key="post.id" class="forum-post">
            <h2>{{ post.title }}</h2>
            <div class="post-meta">
              <span>{{ post.author }}</span>
              <span>{{ post.time }}</span>
              <span>点击量：{{ post.views }}</span>
              <span>回复数：{{ post.replies }}</span>
            </div>
            <p>{{ post.content }}</p>
            <div v-if="post.attachments && post.attachments.length > 0" class="attachments">
              <h3>附件：</h3>
              <ul>
                <li v-for="(attachment, index) in post.attachments" :key="index">
                  <span>{{ attachment.name }}</span>
                  <button @click="downloadAttachment(attachment.url)">下载</button>
                </li>
              </ul>
            </div>
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
      createPostFormVisible: false,
      newPost: {
        title: "",
        content: "",
      },
      posts: [
        // 添加更多虚拟帖子和附件
        {
          id: 1,
          title: "关于视频转3D的问题",
          author: "用户A",
          time: "2023-04-20 12:34",
          views: 234,
          replies: 12,
          content: "最近我在使用Pose Converter进行视频转3D的操作，发现生成的3D姿态视频模型有点模糊，不知道怎么调整，有没有其他人遇到过这个问题呢？",
          attachments: [
            {
              name: "示例视频.mp4",
              url: "https://example.com/sample-video.mp4",
            },
          ],
        },
        // 其他帖子...
      ],
    };
  },
  methods: {
    toggleCreatePostForm() {
      this.createPostFormVisible = !this.createPostFormVisible;
    },
    submitNewPost() {
      this.posts.push({
        id: Date.now(),
        title: this.newPost.title,
        author: "当前用户",
        time: new Date().toLocaleString(),
        views: 0,
        replies: 0,
        content: this.newPost.content,
        attachments: [], // 可以在此处添加
      });
      // 清空表单数据并关闭表单
      this.newPost.title = "";
      this.newPost.content = "";
      this.createPostFormVisible = false;
    },
    downloadAttachment(url) {
      window.open(url, "_blank");
    },
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

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forum-title {
  font-size: 32px;
  font-weight: bold;
  color: #0084ff;
}

.create-post-button {
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
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

.post-meta {
  font-size: 14px;
  color: #999;
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.forum-post p {
  color: #666;
}

.attachments {
  margin-top: 16px;
}

.attachments h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.attachments ul {
  list-style-type: none;
  padding: 0;
}

.attachments li {
  display: flex;
  gap: 8px;
  align-items: center;
}

.attachments button {
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
}
</style>