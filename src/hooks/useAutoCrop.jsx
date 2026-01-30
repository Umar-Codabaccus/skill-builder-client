import { useState } from "react";

export function useAutoCrop(aspectWidth = 16, aspectHeight = 9) {
    const [croppedImage, setCroppedImage] = useState(null);

    const cropToFit = async (imageSrc) => {
        const image = await loadImage(imageSrc);

        const inputWidth = image.width;
        const inputHeight = image.height;

        const targetAspect = aspectWidth / aspectHeight;
        const imageAspect = inputWidth / inputHeight;

        let cropWidth, cropHeight, cropX, cropY;

        // If image is wider than target → crop sides
        if (imageAspect > targetAspect) {
            cropHeight = inputHeight;
            cropWidth = inputHeight * targetAspect;
            cropX = (inputWidth - cropWidth) / 2;
            cropY = 0;
        }
        // If image is taller than target → crop top/bottom
        else {
            cropWidth = inputWidth;
            cropHeight = inputWidth / targetAspect;
            cropX = 0;
            cropY = (inputHeight - cropHeight) / 2;
        }

        // Draw cropped area on canvas
        const canvas = document.createElement("canvas");
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const croppedUrl = URL.createObjectURL(blob);
                setCroppedImage(croppedUrl);
                resolve(croppedUrl);
            }, "image/jpeg");
        });
    };

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    return { croppedImage, cropToFit };
}
