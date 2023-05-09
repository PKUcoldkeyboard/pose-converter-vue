import api from "@/utils/request";

export function getPostById(id) {
    return api({
        url: "/post/" + id,
        method: "get"
    });
}

export function getPostList(page, size) {
    return api({
        url: "/post/",
        method: "get",
        params: {
            "pageNum": page,
            "pageSize": size
        },
    });
}

export function getPostListByUserId(userId, page, size) {
    return api({
        url: "/post/user/" + userId,
        method: "get",
        params: {
            "pageNum": page,
            "pageSize": size
        },
    });
}

export function createPost(title, content, userId) {
    return api({
        url: "/post/",
        method: "post",
        data: {
            "title": title,
            "content": content,
            "userId": userId
        }
    });
}

export function updatePost(id, title, content) {
    return api({
        url: "/post/" + id,
        method: "put",
        data: {
            "title": title,
            "content": content,
        }
    });
}

export function deletePost(id) {
    return api({
        url: "/post/" + id,
        method: "delete"
    });
}

