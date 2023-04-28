<template>
  <div class="file-manager-page">
    <div class="container">
      <h1 class="file-manager-title">文件管理</h1>
      <div class="file-manager-search">
        <a-input-search
          placeholder="请输入文件名关键词"
          enter-button
          style="max-width: 400px;"
        />
      </div>
      <div class="file-manager-bucket">
        <div class="file-manager-bucket-info">
          <span class="file-manager-bucket-username">用户名</span>
          <br />
          <span class="file-manager-bucket-creation-time">创建时间: xxx</span>
          <span class="file-manager-bucket-file-info"
            >文件总大小: xxx，文件数: xxx</span
          >
        </div>
        <div class="file-manager-bucket-action">
          <a-button class="btn-refresh">刷新<redo-outlined /></a-button>
          <a-upload>
            <a-button type="primary" class="btn-upload">上传<upload-outlined /></a-button>
          </a-upload>
        </div>
      </div>
      <div class="file-manager-path">
        <a-button class="btn-refresh" style="padding: 0px 10px;"><left-outlined /></a-button>
        <a-breadcrumb class="bread-crumb">
          <a-breadcrumb-item><a href="">Path</a></a-breadcrumb-item>
          <a-breadcrumb-item><a href="">to</a></a-breadcrumb-item>
          <a-breadcrumb-item><a href="">file</a></a-breadcrumb-item>
        </a-breadcrumb>
        <a-button class="btn-refresh">选择或创建路径<select-outlined /></a-button>
      </div>
      <div class="file-manager-table">
        <a-table :dataSource="fileList" 
                 :columns="columns" rowKey="id" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, unref } from "vue";
import { UploadOutlined, RedoOutlined, SelectOutlined, LeftOutlined } from "@ant-design/icons-vue";
import { Table } from "ant-design-vue";

export default defineComponent({
  components: {
    UploadOutlined,
    RedoOutlined, 
    SelectOutlined,
    LeftOutlined
  },
  data() {
    return {
      fileList: [
        // 示例数据，实际数据应从服务器获取
        {
          id: 1,
          fileName: "3D_Pose_1.obj",
          fileSize: "2.4MB",
          uploadTime: "2023-04-14 10:30",
        },
        {
          id: 2,
          fileName: "3D_Pose_2.obj",
          fileSize: "1.9MB",
          uploadTime: "2023-04-14 14:20",
        },
      ],
      columns: [
        { title: "文件名", dataIndex: "fileName", key: "fileName" },
        { title: "文件大小", dataIndex: "fileSize", key: "fileSize" },
        { title: "上传时间", dataIndex: "uploadTime", key: "uploadTime" },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  setup() {
    
  },
  methods: {
    // @ts-ignore
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

.file-manager-search {
  margin-bottom: 24px;
}

.file-manager-bucket {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.file-manager-bucket-info {
display: flex;
align-items: center;
}

.file-manager-bucket-username {
margin-left: 8px;
}

.file-manager-bucket-creation-time {
margin-left: 8px;
color: #a5a5a5;
}

.file-manager-bucket-file-info {
margin-left: 16px;
color: #a5a5a5;
}

.file-manager-bucket-action {
display: flex;
align-items: center;
}

.file-manager-path {
display: flex;
align-items: center;
margin-bottom: 16px;
}

.file-manager-path-text {
  flex: 1;
  margin-left: 8px;
  margin-bottom: 4px;
  color: #969FA8;
  font: 12px;
}

.bread-crumb {
  flex: 1;
  margin-left: 16px;
  font: 16px;
}

.file-manager-table {
background-color: #fff;
padding: 24px;
border-radius: 4px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-upload {
  border-radius: 3px;
  cursor: pointer;
  width: initial;
  height: 39px;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 0px 8px;
  border-width: 1px;
  border-style: solid;
  color: rgb(255, 255, 255);
  background-color: #0084ff;
  padding: 0px 25px;
}

.btn-refresh {
  border-radius: 3px;
  cursor: pointer;
  width: initial;
  height: 39px;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 0px 8px;
  border-width: 1px;
  border-style: solid;
  padding: 0px 25px;
}
</style>