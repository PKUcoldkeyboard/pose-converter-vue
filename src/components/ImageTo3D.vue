<template>
    <div class="image-to-3d-page">
        <div class="container">
            <h1 class="image-to-3d-title">图片转3D</h1>
            <div class="file-upload">
                <input type="file" ref="imageInput" @change="previewImage" accept=".png" style="display: none" />
                <a-button type="primary" @click="selectImage">选择图片</a-button>
                <p class="file-upload-note">请上传png格式的图片文件。根据文件大小，转换过程可能需要一些时间。</p>
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
                <a-button type="primary" class="process-button" @click="processImage">确定</a-button>
                <a-button class="save-button" @click="saveResult">保存</a-button>
            </div>

            <div class="image-to-3d-process" v-if="processing">
                <a-spin size="large" />
                <p>正在处理图片，请稍候...</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const imageInput = ref(null);
        const uploadedImageSrc = ref(null);
        const generatedImageSrc = ref(null);
        const processing = ref(false);

        const selectImage = () => {
            imageInput.value.click();
        };

        const previewImage = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // 验证文件类型
            if (file.type !== 'image/png') {
                alert('请上传PNG格式的图片文件');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImageSrc.value = e.target.result;
            };
            reader.readAsDataURL(file);
        };

        const processImage = async () => {
            if (!uploadedImageSrc.value) return;

            processing.value = true;

            // 上传文件并转换为3D姿态
            // 实际实现时，需要调用后端接口处理文件
            setTimeout(() => {
                processing.value = false;
                alert('图片处理完成');
                // 示例生成的图片，实际上需要从后端获取
                generatedImageSrc.value = uploadedImageSrc.value;
            }, 3000);
        };

        const saveResult = async () => {
            if (!generatedImageSrc.value) return;

            // 保存生成的图片
            // 实际实现时，需要调用后端接口处理文件
            alert('保存成功');
        };

        return {
            imageInput,
            uploadedImageSrc,
            generatedImageSrc,
            processing,
            selectImage,
            previewImage,
            processImage,
            saveResult,
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
  