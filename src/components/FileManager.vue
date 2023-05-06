<template>
  <div class="file-manager-page">
    <div class="container">
      <h1 class="file-manager-title">文件管理</h1>
      <div class="file-manager-search">
        <a-input-search v-model:value="keyword" placeholder="请输入文件名关键词" enter-button @search="searchFileList" style="max-width: 400px;" />
      </div>
      <div class="file-manager-bucket">
        <div class="file-manager-bucket-info">
          <span class="file-manager-bucket-username">{{ username }}</span>
          <br />
          <span class="file-manager-bucket-file-info">文件总大小: {{ totalFileSize }}，文件数: {{ totalFileCount }}</span>
        </div>
      </div>
      <div class="file-manager-path">

        <a-button class="btn-refresh" @click.native.prevent="refresh">刷新<redo-outlined /></a-button>
          <a-upload :before-upload="handleUpload" :showUploadList="false">
            <a-button type="primary" class="btn-upload">上传<upload-outlined /></a-button>
          </a-upload>
      </div>
      <!-- 添加面包屑导航 -->
      <div class="breadcrumb-wrapper">
        <a-breadcrumb :separator="'>'">
          <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" @click="changePath(index)">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="file-manager-table">
        <a-table :columns="columns" :dataSource="fileList" :scroll="{ y: 400 }" :pagination="false">
          <template #bodyCell="{column, record}">
            <template v-if="column.key === 'action'">
              <a :href="record.fileUrl" download><download-outlined/>下载</a>
              <a-button type="link" danger @click.native.prevent="handleDelete(record.fileName)">删除</a-button>
            </template>
            <template v-else-if="column.key === 'fileName'">
              <span><a @click="navigateToFolder(record)">{{ record.fileName }}</a></span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, ref } from "vue";
import { UploadOutlined, RedoOutlined, SelectOutlined, LeftOutlined, DownloadOutlined } from "@ant-design/icons-vue";
import { Modal, Table, message } from "ant-design-vue";
import { useStore } from "vuex";
import { deleteFile, getMetaData, listFile, searchFiles, uploadFile } from "@/api/minio";
import { transformSize, transformTime } from "@/utils/transform";

export default defineComponent({
  components: {
    UploadOutlined,
    RedoOutlined,
    SelectOutlined,
    LeftOutlined,
    DownloadOutlined,
    Table,
  },
  setup() {
    const columns = [
      {
        title: "文件名",
        dataIndex: "fileName",
        key: "fileName",
      },
      {
        title: "文件大小",
        dataIndex: "fileSize",
        key: "fileSize",
      },
      {
        title: "上传时间",
        dataIndex: "uploadTime",
        key: "uploadTime",
      },
      {
        title: "操作",
        key: "action",
        scopedSlots: { customRender: "action" },
      }
    ];

    const totalFileSize = ref("");
    const totalFileCount = ref(0);

    const currentPath = ref("/");
    const breadcrumbItems = computed(() => currentPath.value.split("/").filter((item) => item !== ""));
    const changePath = (index) => {
      currentPath.value = "/" + breadcrumbItems.value.slice(0, index + 1).join("/");
      fetchFileList();
    };

    const navigateToFolder = (record) => {
      if (record.isDir) {
        currentPath.value += record.fileName + "/";
        fetchFileList();
      }
    }

    const store = useStore();
    
    const fileList = ref([]);
    const fetchFileList = async() => {
      try {
        // 从store中获取用户名作为bucketName
        const prefix = "/";
        listFile(username.value, prefix).then((res) => {
          // 构造fileList的值，通过循环
          let fileValueList = [];
          for (let i = 0; i < res.data.files.length; i++) {
            let fileValue = {
              fileName: res.data.files[i].fileName,
              fileSize: transformSize(res.data.files[i].fileSize),
              uploadTime: transformTime(res.data.files[i].lastModified),
              fileUrl: res.data.files[i].url,
            };
            fileValueList.push(fileValue);
          }
          fileList.value = fileValueList;
        });
        getMetaData(username.value).then((res) => {
          totalFileSize.value = transformSize(res.data.totalFileSize);
          totalFileCount.value = res.data.totalFileCount;
        });
      } catch (error) {
        console.log(error);
      }
    }

    const searchFileList = async() => {
      try {
        // 从store中获取用户名作为bucketName
        const prefix = "/";
        searchFiles(username.value, prefix, keyword.value).then((res) => {
          // 构造fileList的值，通过循环
          let fileValueList = [];
          for (let i = 0; i < res.data.files.length; i++) {
            let fileValue = {
              fileName: res.data[i].fileName,
              fileSize: transformSize(res.data[i].fileSize),
              uploadTime: transformTime(res.data[i].lastModified),
            };
            fileValueList.push(fileValue);
          }
          fileList.value = fileValueList;
        });
      } catch (error) {
        console.log(error);
      }
    }

    const refresh = () => {
      fetchFileList();
      message.success("刷新成功");
    };

    const handleUpload = async(file) => {
      try {
        uploadFile(username.value, file).then((res) => {
          message.success("上传成功");
          fetchFileList();
        });
      } catch (error) {
        console.log(error);
      }
    }

    const handleDelete = async(objectName) => {
      try {
        // 从store中获取用户名作为bucketName
        const bucketName = store.getters.username;
        Modal.confirm({
          title: "删除文件",
          content: "确定删除该文件吗？",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            deleteFile(bucketName, objectName).then((res) => {
              message.success("删除成功");
              fetchFileList();
            });
          },
          onCancel() {
            message.info("取消删除");
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    
    const username = computed(() => store.getters.username);

    const keyword = ref("");
    return {
      totalFileCount,
      totalFileSize,
      columns,
      fileList,
      username,
      refresh,
      keyword,
      currentPath,
      breadcrumbItems,
      changePath,
      fetchFileList,
      searchFileList,
      handleUpload,
      handleDelete,
      navigateToFolder,
    };
  },
  created() {
    // 获取文件列表
    this.fetchFileList();
  },
});
</script>
<style scoped>
.breadcrumb-wrapper {
  margin-bottom: 16px;
}
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