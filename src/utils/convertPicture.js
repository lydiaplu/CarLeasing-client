export function base64ToFile(base64, filename) {
    base64 = `data:image/jpeg;base64,${base64}`;
    // 将base64字符串转换为字节序列
    const byteString = atob(base64.split(',')[1]);
    // 获取MIME类型
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];

    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // 创建文件对象
    const file = new File([byteArray], filename, { type: mimeType });

    return file;
}
