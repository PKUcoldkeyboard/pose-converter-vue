import api from "@/utils/request";

export function convert(bucketName, file) {
    return api.postForm("/video/convert", {
        "bucketName": bucketName,
        "file": file
    });
}