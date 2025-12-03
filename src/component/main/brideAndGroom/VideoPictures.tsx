import { imageMap } from "@/imageMap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const VideoPicture = ({ imageSrc }: { imageSrc: string }) => (
  <div className="relative w-[140px] shrink-0">
    <img src={imageMap.videoFrame} alt="frame" />
    <img
      className="absolute top-1/2 left-1/2 h-[95px] w-[135px] -translate-x-1/2 -translate-y-1/2 object-cover opacity-90"
      src={imageSrc}
      alt="image"
    />
  </div>
);

const ORIGINALS = [
  imageMap.imageFrame_1,
  imageMap.imageFrame_2,
  imageMap.imageFrame_3,
  imageMap.imageFrame_4,
  imageMap.imageFrame_5,
  imageMap.imageFrame_6,
  imageMap.imageFrame_7,
  imageMap.imageFrame_8,
  imageMap.imageFrame_9,
];

const ANIMATION_DURATION = 30;
const REPETITIONS = 3;

const LoopVideoPictures = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const waitForImages = async () => {
      const images = Array.from(track.querySelectorAll("img"));
      const imagePromises = images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          }),
      );

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    waitForImages();
  }, []);

  useGSAP(
    () => {
      if (!imagesLoaded || !trackRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>(".loop-item");
      if (items.length === 0) return;

      const singleSetWidth = items
        .slice(0, ORIGINALS.length)
        .reduce((sum, el) => sum + el.offsetWidth, 0);

      gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: -singleSetWidth,
          duration: ANIMATION_DURATION,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { dependencies: [imagesLoaded] },
  );

  const images = Array.from({ length: REPETITIONS }, () => ORIGINALS).flat();

  return (
    <div className="relative w-full -rotate-1 overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="flex">
        {images.map((src, i) => (
          <div key={i} className="loop-item">
            <VideoPicture imageSrc={src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoopVideoPictures;
