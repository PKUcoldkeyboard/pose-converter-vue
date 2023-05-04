import api from "@/utils/request";

export function getAttachmentById(id) {
    return api({
        url: "/attachment/" + id,
        method: "get"
    })
}

export function getAttachmentsByPostId(id) {
    return api({
        url: "/attachment/post/" + id,
        method: "get"
    })
}

export function createAttachment(postId, fileName, fileSize, fileType, fileUrl) {
    return api.post("/attachment/", {
        "postId": postId,
        "fileName": fileName,
        "fileSize": fileSize,
        "fileType": fileType,
        "fileUrl": fileUrl
    });
}

export function deleteAttachment(id) {
    return api({
        url: "/attachment/" + id,
        method: "delete"
    })
}