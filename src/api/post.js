import { del, get, post, put } from "@/utils/request";

export function getPostById(id) {
    return get("/post/" + id);
}

export function getPostList(page, size) {
    return get("/post", {
        "pageNum": page,
        "pageSize": size
    });
}

export function createPost(title, content, userId) {
    return post("/post", {
        "title": title,
        "content": content,
        "userId": userId
    });
}

export function updatePost(id, title, content) {
    return put("/post/" + id, {
        "title": title,
        "content": content,
    });
}

export function deletePost(id) {
    return del("/post/" + id);
}

