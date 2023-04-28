import { del, get, post } from "@/utils/request";

export function getAttachmentById(id) {
    return get("/attachment/" + id);
}

export function getAttachmentsByPostId(id) {
    return get("/attachment/post/" + id);
}

export function createAttachment(postId, fileName, fileSize, fileType, fileUrl) {
    return post("/attachment", {
        "postId": postId,
        "fileName": fileName,
        "fileSize": fileSize,
        "fileType": fileType,
        "fileUrl": fileUrl
    });
}

export function deleteAttachment(id) {
    return del("/attachment/" + id);
}