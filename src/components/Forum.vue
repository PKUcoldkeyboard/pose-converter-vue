<template>
  <div class="forum-page">
    <div class="container">
      <div class="forum-header">
        <h1 class="forum-title">论坛</h1>
        <button class="create-post-button" @click="showCreatePostModal = true">创建新帖子</button>
      </div>
      <div>
        <a-card v-for="(post, index) in posts" :key="index" class="post-card">
          <!--作者用户名-->
          <h1>{{ post.title }}</h1>
          <a-card-meta :title="`发帖人：` + getUsersById(post.userId).username" :description="formatDate(post.createTime)"></a-card-meta>
          <div class="post-content">{{ post.content }}</div>

          <!-- 显示附件列表 -->
          <!-- 列表标题 -->
          <a-divider orientation="left" style="border-color: black" dashed>附件</a-divider>
          <a-list v-if="post.attachments && post.attachments.length" class="attachment-list">
            <a-list-item v-for="(attachment, index) in post.attachments" :key="index">
              <a :href="attachment.fileUrl" target="_blank">
                {{ attachment.fileName }} ({{ attachment.fileSize }})
              </a>
            </a-list-item>
          </a-list>
          <a-divider orientation="left" style="border-color: black" dashed>评论</a-divider>
          <a-list :dataSource="getCommentsByPostId(post.id)" class="comment-list">
            <template #renderItem="{ item: comment }">
              <a-list-item>
                <a-comment :author="getUsersById(comment.userId).username" :content="comment.content"
                  :datetime="formatDate(comment.createTime)">
                </a-comment>
              </a-list-item>
            </template>
          </a-list>
          <!-- 添加回复按钮 -->
          <a-button @click="showReplyModal=true; replyPostId=post.id" class="reply-button">回复</a-button>
          <a-modal title="回复帖子" :visible="showReplyModal" @ok="handleReplyClick" @cancel="showReplyModal=false">
            <a-form>
              <a-form-item label="内容">
                <a-textarea v-model:value="replyContent" placeholder="请输入回复内容"></a-textarea>
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>
        <a-pagination
          :current="currentPage"
          :total="posts.length"
          :pageSize="10"
          @change="handlePageChange"
          class="pagination"
        ></a-pagination>
        <a-modal title="创建新帖子" :visible="showCreatePostModal" @ok="handleCreatePost" @cancel="showCreatePostModal = false">
          <a-form>
            <a-form-item label="标题">
              <a-input v-model:value="newPostTitle" placeholder="请输入帖子标题"></a-input>
            </a-form-item>
            <a-form-item label="内容">
              <a-textarea v-model:value="newPostContent" placeholder="请输入帖子内容"></a-textarea>
            </a-form-item>
          </a-form>
          <div class="file-upload">
          <a-upload :showUploadList="true"
                    :before-upload="validateFile">
            <a-button><upload-outlined />添加附件</a-button>
          </a-upload>
        </div>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { createComment, getComments, getCommentsByPostId } from '@/api/comment';
import { createPost, getPostList } from '@/api/post';
import { transformTime, transformSize } from '@/utils/transform';
import { getUserList } from '@/api/user';
import { Modal, message } from 'ant-design-vue';
import { uploadFile } from '@/api/minio';
import { createAttachment, getAttachmentsByPostId } from '@/api/attachment';

export default defineComponent({
  setup() {
    const store = useStore();
    const userId = computed(() => store.getters.userId);
    const posts = ref([]);
    const comments = ref([]);
    const users = ref([]);
    const currentPage = ref(1);
    const showCreatePostModal = ref(false);
    const showReplyModal = ref(false);
    const newPostTitle = ref('');
    const newPostContent = ref('');
    const replyContent = ref('');
    const replyPostId = ref('');
    const fileList = ref([]);


    const fetchComments = async (postId) => {
      const response = await getComments();
      comments.value = response.data;
    };

    const fetchPosts = async () => {
      const response = await getPostList(currentPage.value, 10);
      posts.value = response.data;

      for (let i = 0; i < posts.value.length; i++) {
        const post = posts.value[i];
        const response2 = await getAttachmentsByPostId(post.id)
        posts.value[i].attachments = response2.data;
        for (let j = 0; j < response2.data.length; j++) {
          posts.value[i].attachments[j].fileSize = transformSize(posts.value[i].attachments[j].fileSize);
        }
      }
    };

    const fetchUsers = async () => {
      const response = await getUserList();
      users.value = response.data;
    };


    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * 10;
      const end =  start + 10;
      return posts.value.slice(start, end);
    });

    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    // 调用 transformTime 函数，将时间戳转换为日期字符串
    const formatDate = (timestamp) => transformTime(timestamp);

    const getCommentsByPostId = (postId) => {
      return comments.value.filter((comment) => comment.postId === postId);
    };

    const getUsersById = (userId) => {
      return users.value.find((user) => user.id === userId);
    };

    const handleCreatePost = async () => {
      const response = await createPost(newPostTitle.value, newPostContent.value, userId.value);
      posts.value.push(response.data);
      showCreatePostModal.value = false;
      newPostTitle.value = '';
      newPostContent.value = '';

      // 创建附件
      const postId = response.data.id;
      // 遍历 fileList，上传每个文件
      fileList.value.forEach(async (file) => {
        let url = '';
        try {
          const response = await uploadFile(username.value, file);
          url = response.data;
          message.success("上传成功");
        } catch (error) {
          console.log(error);
          message.error("上传失败");
        }

        try {
          const response = await createAttachment(postId, file.name, file.size, 'object', url);
          message.success("创建附件成功");
        } catch (error) {
          console.log(error);
          message.error("创建附件失败");
        }
      });
      fetchPosts();
      fetchUsers();
      fetchComments();
      message.success('创建成功');
    };

    const validateFile = (file) => {
      // 限制 mp4、png、blender 三种格式的文件
      const fileType = file.type;
      if (fileType !== "video/mp4" && fileType !== "image/png" && fileType !== "application/x-blender") {
        message.error("只能上传 mp4、png、blender 三种格式的文件");
        return false;
      }
      fileList.value.push(file);

      return false;
    };

    const handleReplyClick = async (post) => {
      const response = await createComment(replyContent.value, userId.value, replyPostId.value);
      comments.value.push(response.data);
      showReplyModal.value = false;
      replyContent.value = '';
      replyPostId.value = '';
      message.success('回复成功');
    };

    const username = computed(() => store.getters.username);

    return {
      userId,
      posts,
      comments,
      users,
      currentPage,
      handlePageChange,
      paginatedPosts,
      formatDate,
      fetchComments,
      fetchUsers,
      fetchPosts,
      getCommentsByPostId,
      getUsersById,
      showCreatePostModal,
      showReplyModal,
      newPostTitle,
      newPostContent,
      handleCreatePost,
      fileList,
      username,
      handleReplyClick,
      replyContent,
      replyPostId,
      validateFile,
    }
  },
  created() {
    this.fetchPosts();
    this.fetchComments();
    this.fetchUsers();
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

.post-card {
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  font-family: 'Roboto', sans-serif;
}

.post-card:hover {
  border-color: #0084ff;
}

.post-content {
  margin-top: 20px;
  color: #1a1a1a;
}

.comment-list {
  margin-top: 20px;
}

.a-comment {
  color: #1a1a1a;
}

.attachment-upload {
  margin-top: 20px;
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

.create-post-button:hover {
  background-color: #006fd6;
}

.file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

</style>