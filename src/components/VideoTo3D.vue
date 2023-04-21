<template>
  <div class="video-to-3d-page">
    <div class="container">
      <h1 class="video-to-3d-title">视频转3D</h1>
      <div class="file-upload">
        <input type="file" ref="videoInput" @change="uploadVideo" accept=".mp4" style="display: none" />
        <a-button type="primary" @click="selectVideo">选择视频</a-button>
        <p class="file-upload-note">请上传mp4格式的视频文件。根据文件大小，转换过程可能需要一些时间。</p>
      </div>
      <div class="video-preview">
              <div class="uploaded-video">
                  <!-- <img :src="uploadedImageSrc" v-if="uploadedImageSrc" /> -->
                  <p>显示视频</p>
              </div>
              <div class="generated-video">
                  <!-- <img :src="generatedImageSrc" v-if="generatedImageSrc" /> -->
                  <p>显示骨架</p>
              </div>
            </div>
            <div class="buttons-container">
                <a-button type="primary" class="process-button">开始转换</a-button>
                <a-button class="save-button" @click="saveResult">保存骨架姿态视频</a-button>
                <a-button class="save-button" @click="saveResult">保存骨架姿态模型</a-button>
            </div>
      <div class="video-to-3d-process" v-if="processing">
        <a-spin size="large" />
        <p>正在处理视频，请稍候...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const videoInput = ref(null);
    const processing = ref(false);

    const selectVideo = () => {
      videoInput.value.click();
    };

    const uploadVideo = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // 验证文件类型
      if (file.type !== 'video/mp4') {
        alert('请上传MP4格式的视频文件');
        return;
      }

      processing.value = true;

      // 上传文件并转换为3D姿态
      // 实际实现时，需要调用后端接口处理文件
      setTimeout(() => {
        processing.value = false;
        alert('视频处理完成');
      }, 3000);
    };

    const saveResult = async () => {
            // 保存生成的图片
            // 实际实现时，需要调用后端接口处理文件
            alert('保存成功');
        };
    

    return {
      videoInput,
      processing,
      selectVideo,
      uploadVideo,
      saveResult
    };
  },
});
</script>

<style scoped>
.video-to-3d-page {
  margin-top: 72px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 72px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.video-to-3d-title {
  font-size: 32px;
  font-weight: bold;
  color: #0084ff;
  margin-bottom: 24px;
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

.file-upload-note {
  margin-top: 16px;
  font-size: 14px;
  color: #999;
}

.video-to-3d-process {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-preview {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.uploaded-video,
.generated-video {
    width: 45%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ccc;
    border-radius: 4px;
}

.uploaded-image img,
.generated-image img {
    max-width: 100%;
    max-height: 100%;
}

.buttons-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 24px;
    width: 100%;
}

.process-button,
.save-button {
    margin-left: 8px;
}
</style>
