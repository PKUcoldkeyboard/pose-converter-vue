import { post } from "@/utils/request";

export function login(username, password) {
    return post("/login", {
        "username": username,
        "password": password
    });
}