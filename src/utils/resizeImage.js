export function resizeImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                let width = image.width;
                let height = image.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = height * (maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = width * (maxHeight / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");

                // 清除canvas内容以保证透明背景
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // 绘制图像到canvas，保持背景透明
                ctx.drawImage(image, 0, 0, width, height);

                // 将canvas内容转为Blob，使用'image/png'以保持透明度
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png', quality); // 注意：质量参数在PNG中不起作用
            };
            image.src = readerEvent.target.result;
        };

        // 读取文件作为DataURL
        reader.readAsDataURL(file);
    });
}
