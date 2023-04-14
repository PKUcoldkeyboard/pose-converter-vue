<template>
    <div class="file-manager-page">
      <div class="container">
        <h1 class="file-manager-title">文件管理</h1>
        <div class="file-manager-content">
          <a-table :dataSource="fileList" :columns="columns" rowKey="id" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        fileList: [
          // 示例数据，实际数据应从服务器获取
          { id: 1, fileName: '3D_Pose_1.obj', fileSize: '2.4MB', uploadTime: '2023-04-14 10:30' },
          { id: 2, fileName: '3D_Pose_2.obj', fileSize: '1.9MB', uploadTime: '2023-04-14 14:20' },
        ],
        columns: [
          { title: '文件名', dataIndex: 'fileName', key: 'fileName' },
          { title: '文件大小', dataIndex: 'fileSize', key: 'fileSize' },
          { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime' },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
      };
    },
    methods: {
      downloadFile(file) {
        // 实现文件下载功能
      },
    },
  });
  </script>
  
  <style scoped>
  .file-manager-page {
    margin-top: 72px;
    background-color: #f5f5f5;
    min-height: calc(100vh - 72px);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
  
  .file-manager-title {
    font-size: 32px;
    font-weight: bold;
    color: #0084ff;
    margin-bottom: 24px;
  }
  
  .file-manager-content {
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  