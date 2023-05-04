import api from "@/utils/request";

export function convert(bucketName, imageUrl) {
    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    formData.append("bucketName", bucketName);

    return api({
        url: "/image/convert",
        method: "post",
        data: formData,
    })
}