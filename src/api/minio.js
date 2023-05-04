import api from "@/utils/request";

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
        url: "/file/" + bucketName + "/" + objectName,
        method: "delete"
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