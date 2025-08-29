// src/utils/compressImage.js
export function compressImage(file, { maxWidth = 1024, quality = 0.72 } = {}) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // scale down maintaining aspect ratio
        if (width > maxWidth) {
          height = Math.round((maxWidth / width) * height);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d", { alpha: false });
        ctx.drawImage(img, 0, 0, width, height);

        // export as JPEG
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compression failed"));
            const compressed = new File(
              [blob],
              file.name.replace(/\.(png|jfif)$/i, ".jpg"),
              {
                type: "image/jpeg",
                lastModified: Date.now(),
              }
            );
            resolve(compressed);
          },
          "image/jpeg",
          quality // 0..1
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    } catch (e) {
      reject(e);
    }
  });
}
