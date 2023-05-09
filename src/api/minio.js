import api from "@/utils/request";
import axios from "axios";

export function uploadFile(bucketName, file) {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    
    return api.post(
        "/file/upload/" + bucketName,
        formData,
        config
    )
}

export function listFile(bucketName, prefix) {
    return api({
        url: "/file/",
        method: "get",
        params: {
            bucketName: bucketName,
            prefix: prefix
        }
    })
}

export function deleteFile(bucketName, objectName) {
    return api({
        url: "/file/delete",
        method: "delete",
        params: {
            bucketName: bucketName,
            objectName: objectName
        }
    })
}

export function searchFiles(bucketName, prefix, keyword) {
    return api({
        url: "/file/search",
        method: "get",
        params: {
            bucketName: bucketName,
            prefix: prefix,
            keyword: keyword
        }
    })
}

export function getMetaData(bucketName) {
    return api({
        url: "/file/meta",
        method: "get",
        params: {
            bucketName: bucketName
        }
    })
}

export function renameFile(bucketName, oldName, newName) {
    return api({
        url: "/file/rename",
        method: "put",
        params: {
            bucketName: bucketName,
            oldName: oldName,
            newName: newName
        }
    })
}

export function renameDir(bucketName, oldName, newName) {
    return api({
        url: "/file/rename/dir",
        method: "put",
        params: {
            bucketName: bucketName,
            oldName: oldName,
            newName: newName
        }
    })
}

export function deleteDir(bucketName, dirName) {
    return api({
        url: "/file/delete/dir",
        method: "delete",
        params: {
            bucketName: bucketName,
            prefix: dirName
        }
    })
}

export function downloadZip(bucketName, prefix) {
    const downloadUrl = `http://localhost:8058/api/file/download/zip?bucketName=${bucketName}&prefix=${prefix}`;
    return axios.get(downloadUrl, {
        responseType: 'blob',
        headers: {
            'sa-token': localStorage.getItem('token') || ''
        }
    })
}