import { useEffect, useState } from "react";
import { imageMap } from "@/imageMap";

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader = ({ onLoadComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const images = Object.values(imageMap);
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / images.length) * 100);
      setProgress(newProgress);

      if (loadedCount === images.length) {
        setTimeout(() => {
          onLoadComplete();
        }, 500); // Small delay for smooth transition
      }
    };

    const handleImageError = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setTimeout(() => {
          onLoadComplete();
        }, 500);
      }
    };

    // Preload all images
    images.forEach((imagePath) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = imagePath;
    });
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <img
        src={imageMap.bg10}
        className="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2"
      />
      <img className="absolute right-0 bottom-0 z-0" src={imageMap.bg11} />
      <img className="absolute top-0 right-0 z-0" src={imageMap.bg1} />
      <div className="relative z-10 text-center">
        <h1 className="mb-8 text-4xl font-bold text-[#928362]">Loading...</h1>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-[#928362] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">{progress}%</p>
      </div>
    </div>
  );
};

export default Loader;
