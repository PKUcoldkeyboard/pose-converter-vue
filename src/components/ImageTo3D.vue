<template>
    <div class="image-to-3d-page">
        <div class="container">
            <h1 class="image-to-3d-title">图片转3D</h1>
            <div class="file-upload">
                <a-upload :file-list="fileList"
                          :showUploadList="false"
                          :before-upload="beforeUpload">
                    <a-button><upload-outlined />选择图片</a-button>
                </a-upload>
                <p class="file-upload-note">请上传png格式的图片文件。根据文件大小，转换过程可能需要一些时间。点击开始转换后会自动存储相应文件到文件管理模块中。</p>
            </div>
            <div class="image-preview">
                <div class="uploaded-image">
                    <img :src="uploadedImageSrc" v-if="uploadedImageSrc" />
                    <p v-else>显示图片</p>
                </div>
                <div class="generated-image">
                    <img :src="generatedImageSrc" v-if="generatedImageSrc" />
                    <p v-else>显示骨架</p>
                </div>
            </div>
            <div class="buttons-container">
                <a-button type="primary" class="process-button" @click.native.prevent="handleConvert">开始转换</a-button>
            </div>

            <div class="image-to-3d-process" v-if="processing">
                <a-spin size="large" />
                <p>正在处理图片，请稍候...</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { convert } from '@/api/image';
import { uploadFile } from '@/api/minio';
import { message } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { UploadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components: {
        UploadOutlined
    },
    setup() {
        const store = useStore();

        const processing = ref(false);
        const uploadedImageSrc = ref('');
        const generatedImageSrc = ref('');
        const fileList = ref([]);

        const beforeUpload = async(file) => {
            const isPng = file.type === 'image/png';
            if (!isPng) {
                message.error('请上传png格式的图片文件');
                return false;
            }

            // 上传图片
            try {
                const response = await uploadFile(username.value, file);
                const uploadedFile = new File([file], response.data, { type: file.type });
                fileList.value.push(uploadedFile);
                uploadedImageSrc.value = response.data;
                message.success("上传成功");
            } catch (error) {
                console.log(error);
                message.error("上传失败");
                return false;
            }
            return false;
        };

        const handleConvert = async () => {
            processing.value = true;    
            try {
                const res = await convert(username.value, uploadedImageSrc.value);
                generatedImageSrc.value = "http://" + res.data.image_path;
                message.success('转换成功');
            } catch (error) {
                console.log(error);
                message.error('转换失败');
            } finally {
                processing.value = false;
            }
        };

        const username = computed(() => store.getters.username);
        
        return {
            processing,
            uploadedImageSrc,
            generatedImageSrc,
            fileList,
            beforeUpload,
            handleConvert,
            username,
        };
    },
});
</script>
  
<style scoped>
.image-to-3d-page {
    margin-top: 72px;
    background-color: #f5f5f5;
    min-height: calc(100vh - 72px);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
}

.image-to-3d-title {
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

.image-preview {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.uploaded-image,
.generated-image {
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


.image-to-3d-process {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
  