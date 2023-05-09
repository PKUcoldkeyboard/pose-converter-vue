<template>
  <div class="file-manager-page">
    <div class="container">
      <h1 class="file-manager-title">文件管理</h1>
      <div class="file-manager-search">
        <a-input-search v-model:value="keyword" placeholder="请输入文件名关键词" enter-button @search="searchFileList"
          style="max-width: 400px;" />
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
        <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="handleUpload"
          class="btn-upload">上传<upload-outlined /></a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </div>
      <div class="file-manager-table">
        <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns"
          :dataSource="fileList" :scroll="{ y: 400 }" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a v-if="!record.isDir"
                @click="showFileRenameModal = true; prefix = record.prefix; oldObjectName = record.fileName;"><edit-outlined />重命名</a>
              <a v-else-if="record.isDir"
                @click="showDirectoryRenameModal = true; prefix = record.prefix; oldObjectName = record.fileName;"><edit-outlined />重命名</a>

              <a v-if="record.isDir" @click.prevent="handleDownloadZip(record)" style="margin-left: 8px;" href="#" target="_blank"><download-outlined />下载</a>
              <a v-else-if="!record.isDir" style="margin-left: 8px;" :href="record.url" target="_blank" download><download-outlined />下载</a>
              <a-popconfirm @confirm="handleDelete(record)" title="确认删除?">
                <template #icon><question-circle-outlined style="color: red" /></template>
                <a style="color:red; margin-left: 8px;">删除</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
        <a-modal title="修改文件名" :visible="showFileRenameModal" @ok="handleFileRename"
          @cancel="showFileRenameModal = false; prefix = ''; oldObjectName = ''; newObjectName = ''">
          <a-form>
            <a-form-item label="新文件名">
              <a-input v-model:value="newObjectName" placeholder="请输入文件名"></a-input>
            </a-form-item>
          </a-form>
        </a-modal>
        <a-modal title="修改目录名" :visible="showDirectoryRenameModal" @ok="handleDirectoryRename"
          @cancel="showDirectoryRenameModal = false; prefix = ''; oldObjectName = ''; newObjectName = ''">
          <a-form>
            <a-form-item label="新目录名">
              <a-input v-model:value="newObjectName" placeholder="请输入目录名"></a-input>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import {
  UploadOutlined, RedoOutlined, SelectOutlined, LeftOutlined, DownloadOutlined, QuestionCircleOutlined,
  CheckOutlined, EditOutlined
} from "@ant-design/icons-vue";
import { Modal, Table, message } from "ant-design-vue";
import { useStore } from "vuex";
import { deleteDir, deleteFile, downloadZip, getMetaData, listFile, renameDir, renameFile, searchFiles } from "@/api/minio";
import { transformSize, transformTime, transformBytesString } from "@/utils/transform";
import { createPost } from "@/api/post";
import { createAttachment } from "@/api/attachment";

export default defineComponent({
  components: {
    UploadOutlined,
    RedoOutlined,
    SelectOutlined,
    LeftOutlined,
    DownloadOutlined,
    QuestionCircleOutlined,
    CheckOutlined,
    EditOutlined,
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
        title: "修改时间",
        dataIndex: "lastModified",
        key: "lastModified",
      },
      {
        title: "操作",
        key: "action",
        scopedSlots: { customRender: "action" },
      }
    ];

    const totalFileSize = ref("");
    const totalFileCount = ref(0);

    const store = useStore();

    const fileList = ref([]);
    const fetchFileList = async () => {
      try {
        // 从store中获取用户名作为bucketName
        const prefix = "/";
        listFile(username.value, prefix).then((res) => {
          // 设置fileList的值，如果isDir是true，则设置fileSize和uploadTime为空字符串，需要递归直到没有children属性
          const mapFunction = (item) => {
            if (item.isDir) {
              item.fileSize = "";
              item.lastModified = "";
              item.key = item.prefix + item.fileName;
              if (item.children) {
                item.children = item.children.map(mapFunction);
              }
            } else {
              item.fileSize = transformSize(item.fileSize);
              item.lastModified = transformTime(item.lastModified);
              item.key = item.prefix + item.fileName;
            }
            return item;
          };
          fileList.value = res.data.map(mapFunction);
        });

        getMetaData(username.value).then((res) => {
          totalFileSize.value = transformSize(res.data.totalFileSize);
          totalFileCount.value = res.data.totalFileCount;
        });
      } catch (error) {
        console.log(error);
      }
    }

    const searchFileList = async () => {
      try {
        // 从store中获取用户名作为bucketName
        const prefix = "/";
        searchFiles(username.value, prefix, keyword.value).then((res) => {
          const mapFunction = (item) => {
            if (item.isDir) {
              item.fileSize = "";
              item.lastModified = "";
              item.key = item.prefix + item.fileName;
              if (item.children) {
                item.children = item.children.map(mapFunction);
              }
            } else {
              item.fileSize = transformSize(item.fileSize);
              item.lastModified = transformTime(item.lastModified);
              item.key = item.prefix + item.fileName;
            }
            return item;
          };
          fileList.value = res.data.map(mapFunction);
        });
      } catch (error) {
        console.log(error);
      }
    }

    const refresh = () => {
      fetchFileList();
      message.success("刷新成功");
    };

    const handleDelete = async (record) => {
      try {
        // 从store中获取用户名作为bucketName
        const bucketName = store.getters.username;
        const title = record.isDir ? "删除目录" : "删除文件";
        const content = record.isDir ? "确定删除该目录吗？" : "确定删除该文件吗？";
        Modal.confirm({
          title: title,
          content: content,
          okText: "确定",
          cancelText: "取消",
          onOk() {
            if (record.isDir) {
              deleteDir(bucketName, record.fileName).then((res) => {
                message.success("删除目录成功");
                fetchFileList();
              });
              return;
            }

            deleteFile(bucketName, record.fileName).then((res) => {
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

    const prefix = ref("/");
    const oldObjectName = ref("");
    const newObjectName = ref("");
    const showFileRenameModal = ref(false);
    const showDirectoryRenameModal = ref(false);

    const handleFileRename = async () => {
      // 访问接口，修改文件名
      oldObjectName.value = prefix.value + oldObjectName.value;
      newObjectName.value = prefix.value + newObjectName.value;
      const response = await renameFile(username.value, oldObjectName.value, newObjectName.value);
      if (response.data === "重命名成功") {
        message.success("修改成功");
        fetchFileList();
      } else {
        message.error("修改失败");
      }
      showFileRenameModal.value = false;
      oldObjectName.value = "";
      newObjectName.value = "";
    }

    const handleDirectoryRename = async () => {
      oldObjectName.value = prefix.value + oldObjectName.value;
      newObjectName.value = prefix.value + newObjectName.value;
      const response = await renameDir(username.value, oldObjectName.value, newObjectName.value);
      if (response.data === "重命名成功") {
        message.success("修改成功");
        fetchFileList();
      } else {
        message.error("修改失败");
      }
      showDirectoryRenameModal.value = false;
      oldObjectName.value = "";
      newObjectName.value = "";
    }

    const state = reactive({
      selectedRowKeys: [],
      selectedRowProperties: [],
      loading: false,
    })
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const onSelectChange = (selectedRowKeys, selectedRows) => {
      // 清空state.selectedRowProperties
      state.selectedRowProperties = [];
      state.selectedRowKeys = selectedRowKeys;
      for (let i = 0; i < selectedRows.length; i++) {
        const row = selectedRows[i];
        if (row.isDir) {
          const prefix = row.prefix + row.fileName;
          // 如果是目录，则打包成zip文件
          state.selectedRowProperties.push({
            "fileName": row.fileName + ".zip",
            "fileSize": 0,
            "fileType": "dir",
            "fileUrl": `http://localhost:8058/api/file/download/zip?bucketName=${username.value}&prefix=${prefix}`,
          })
        } else {
          state.selectedRowProperties.push({
            "fileName": row.fileName,
            "fileSize": transformBytesString(row.fileSize),
            "fileType": "object",
            "fileUrl": row.url,
          })
        }
      }
    };

    const userId = computed(() => store.getters.userId);

    const handleUpload = async () => {
      state.loading = true;
      const response = await createPost('文件分享', '', userId.value);

      // 创建附件
      const postId = response.data.id;
      for (let i = 0; i < state.selectedRowProperties.length; i++) {
        const property = state.selectedRowProperties[i];
        const fileName = property.fileName;
        const fileSize = property.fileSize;
        const fileType = property.fileType;
        const fileUrl = property.fileUrl;
        createAttachment(postId, fileName, fileSize, fileType, fileUrl);
      }
      state.loading = false;
      message.success('上传成功');
    }

    const handleDownloadZip = async (record) => {
      const prefix = record.prefix + record.fileName;
      const response = await downloadZip(username.value, prefix);
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', record.fileName + '.zip');

      // 将 <a> 标签插入到 DOM 中，触发点击事件以开始下载，然后将其从 DOM 中移除
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 释放 URL 对象
      window.URL.revokeObjectURL(url);
    }

    return {
      totalFileCount,
      totalFileSize,
      columns,
      fileList,
      username,
      refresh,
      keyword,
      fetchFileList,
      searchFileList,
      handleUpload,
      handleDelete,
      showFileRenameModal,
      showDirectoryRenameModal,
      prefix,
      oldObjectName,
      newObjectName,
      handleFileRename,
      handleDirectoryRename,
      hasSelected,
      ...toRefs(state),
      onSelectChange,
      userId,
      handleDownloadZip,
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

.editable-cell {
  position: relative;
}

.editable-cell .editable-cell-input-wrapper,
.editable-cell .editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell .editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell .editable-cell-icon,
.editable-cell .editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell .editable-cell-icon {
  margin-top: 4px;
  display: none;
}

.editable-cell .editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell .editable-cell-icon:hover,
.editable-cell .editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-cell .editable-add-btn {
  margin-bottom: 8px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}</style>