import api from "@/utils/request";

export function register(username, password) {
    return api({
        url: "/register",
        method: "post",
        data: {
            "username": username,
            "password": password
        }
    })
}

export function update(id, password) {
    return api({
        url: "/user/" + id,
        method: "put",
        data: {
            "password": password
        }
    })
}

export function getUserList() {
    return api({
        url: "/user/",
        method: "get"
    })
}