import api from "@/utils/request";

export function convert(bucketName, videoUrl) {
    const formData = new FormData();
    formData.append("videoUrl", videoUrl);
    formData.append("bucketName", bucketName);

    // 设置无限超时时间
    return api.post("/video/convert", formData, {
        timeout: null,
    });
}
