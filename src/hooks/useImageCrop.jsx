import { useState } from "react";

export function useImageCrop() {
    const [croppedImage, setCroppedImage] = useState(null);

    const cropImage = async (imageSrc, crop) => {
        const image = await loadImage(imageSrc);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
            image,
            crop.x, crop.y, crop.width, crop.height,
            0, 0, crop.width, crop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const filrUrl = URL.createObjectURL(blob);
                setCroppedImage(fileUrl);
                resolve({ blob, url: fileUrl });
            }, "image/jpeg");
        });
    };

    const loadImage = (src) => {
        return new Promise = (resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymouse";
            img.onload = () => resolve(img);
            img.src = src;
        }
    }

    return { croppedImage, cropImage }
}