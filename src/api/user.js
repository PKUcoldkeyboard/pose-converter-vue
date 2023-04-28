import { post, put } from "@/utils/request";

export function register(username, password) {
    return post("/user", {
        "username": username,
        "password": password
    });
}

export function update(id, password) {
    return put("/user/" + id, {
        "password": password
    });
}