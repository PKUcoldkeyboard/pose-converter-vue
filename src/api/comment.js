import api from "@/utils/request";

export function getComments() {
    return api.get("/comment/");
}

export function getCommentsById(id) {
    return api.get(`/comment/${id}`);
}

export function getCommentsByPostId(postId) {
    return api.get(`/comment/post/${postId}`);
}

export function updateComment(id, content) {
    return api.put(`/comment/${id}`, {
        "content": content,
    });
}

export function createComment(content, userId, postId) {
    return api.post("/comment/", {
        "content": content,
        "userId": userId,
        "postId": postId
    });
}

export function deleteComment(id) {
    return api.delete(`/comment/${id}`);
}