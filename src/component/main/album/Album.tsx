import { imageMap } from "@/imageMap";
import LoopVideoPictures from "../brideAndGroom/VideoPictures";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Album = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // First album image - fly in from left with rotation
      gsap.from(".album-image-1", {
        scrollTrigger: {
          trigger: ".album-image-1",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        x: 100,
        rotation: 45,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
      });

      // Second album image - fly in from right with rotation
      gsap.from(".album-image-2", {
        scrollTrigger: {
          trigger: ".album-image-2",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: -50,
        x: -100,
        rotation: -45,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      // Album text animation
      gsap.from(".album-text", {
        scrollTrigger: {
          trigger: ".album-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Love text animation
      gsap.from(".love-text", {
        scrollTrigger: {
          trigger: ".love-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="location-section ip16:pb-24 realme-neo2:pb-12 relative flex flex-col gap-7 overflow-hidden pb-24 text-center text-[#928362]"
    >
      <img
        className="location-bg-10 absolute top-0 h-full"
        src={imageMap.bg3}
      />
      <LoopVideoPictures />
      <div className="flex flex-col gap-15">
        <div className="z-10">
          <div className="realme-neo2:text-4xl grid grid-cols-3 gap-5 text-3xl">
            <div className="album-text flex flex-col pl-3">
              <p className="font-fontFour text-7xl">The</p>
              <p>Album</p>
            </div>
            <div className="relative col-span-2">
              <div
                className="album-image-1 grid-span-2 realme-neo2:h-[250px] realme-neo2:w-[250px] realme-neo2:p-3 absolute -top-10 -right-5 mx-auto h-[200px] w-[200px] rotate-15 overflow-hidden border border-[rgb(146,131,98,.25)] bg-white p-2"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    rotation: 0,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotation: 15,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }}
              >
                <img
                  className="h-full w-full border border-[rgb(146,131,98,.25)] bg-white object-cover"
                  src={imageMap.album_1}
                  alt="album-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="z-9">
          <div className="realme-neo2:text-4xl ext-3xl grid grid-cols-2">
            <div className="relative">
              <div
                className="album-image-2 grid-span-2 realme-neo2:h-[200px] realme-neo2:w-[200px] realme-neo2:p-3 absolute -top-10 -right-5 mx-auto h-[180px] w-[180px] -rotate-7 overflow-hidden border border-[rgb(146,131,98,.25)] bg-white p-2"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    rotation: 0,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotation: -7,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }}
              >
                <img
                  className="h-full w-full border border-[rgb(146,131,98,.25)] bg-white object-cover"
                  src={imageMap.album_2}
                  alt="album-2"
                />
              </div>
            </div>

            <div className="love-text font-fontTwo realme-neo2:py-14 flex flex-col items-center py-4 text-3xl">
              <p>OF</p>
              <p>LOVE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
