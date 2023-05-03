import api from "@/utils/request";

export function login(username, password) {
    return api({
        url: "/login",
        method: "post",
        data: {
            "username": username,
            "password": password
        }
    });
}