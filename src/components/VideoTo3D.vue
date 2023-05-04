<template>
  <div class="video-to-3d-page">
    <div class="container">
      <h1 class="video-to-3d-title">视频转3D</h1>
      <div class="file-upload">
        <a-upload :file-list="fileList"
                          :showUploadList="false"
                          :before-upload="beforeUpload">
                    <a-button><upload-outlined />选择视频</a-button>
        </a-upload>
        <p class="file-upload-note">请上传mp4格式的视频文件。根据文件大小，转换过程可能需要一些时间。点击开始转换后会自动存储相应文件到文件管理模块中。</p>
      </div>
      <div class="video-preview">
              <div class="uploaded-video">
                  <video :src="uploadedVideoSrc" v-if="uploadedVideoSrc" controls autoplay loop style="width:100%;height:100%;"></video>
                  <!-- <img :src="uploadedImageSrc" v-if="uploadedImageSrc" /> -->
                  <p v-else>显示视频</p>
              </div>
              <div class="generated-video">
                  <video :src="generatedVideoSrc" v-if="generatedVideoSrc" controls autoplay loop style="width:100%;height:100%;"></video>
                  <!-- <img :src="generatedImageSrc" v-if="generatedImageSrc" /> -->
                  <p v-else>显示骨架</p>
              </div>
            </div>
            <div class="buttons-container">
                <a-button type="primary" class="process-button" @click.native.prevent="handleConvert">开始转换</a-button>
            </div>
      <div class="video-to-3d-process" v-if="processing">
        <a-spin size="large" />
        <p>正在处理视频，请稍候...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { convert } from '@/api/video';
import { uploadFile } from '@/api/minio';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    UploadOutlined
  },
  setup() {
    const processing = ref(false);
    const fileList = ref([]);
    const uploadedVideoSrc = ref('');
    const generatedVideoSrc = ref('');

    const store = useStore();

    const beforeUpload = async(file) => {
      const isMp4 = file.type === 'video/mp4';
      if (!isMp4) {
        message.error('请上传mp4格式的视频文件');
      }
      // 上传视频
      try {
          const response = await uploadFile(username.value, file);
          const uploadedFile = new File([file], response.data, { type: file.type });
          fileList.value.push(uploadedFile);
          uploadedVideoSrc.value = response.data;
          message.success("上传成功");
      } catch (error) {
          console.log(error);
          message.error("上传失败");
          return false;
      }
      return false;
    };

    const handleConvert = async() => {
      processing.value = true;
      try {
        const response = await convert(username.value, uploadedVideoSrc.value);
        generatedVideoSrc.value = "http://" + response.data.video_path;
        message.success("转换成功");
      } catch (error) {
        console.log(error);
        message.error("转换失败");
      }
      processing.value = false;
    };

    const username = computed(() => store.getters.username);

    return {
      processing,
      fileList,
      beforeUpload,
      username,
      uploadedVideoSrc,
      generatedVideoSrc,
      handleConvert
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
