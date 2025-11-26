import { imageMap } from "@/imageMap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Seperator = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // SAVE Timeline
      const saveTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".save-text",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      saveTl.from(".save-text", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      // THE Timeline
      const theTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".the-text",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      theTl.from(".the-text", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "back.out(2)",
      });

      // DATE Timeline
      const dateTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".date-text",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      dateTl.from(".date-text", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative text-white">
      <img src={imageMap.seperator} className="brightness-95" />
      <div className="absolute inset-0 bg-black opacity-15" />
      <div className="absolute bottom-[30%] left-[10%] z-2 flex flex-col gap-3 text-6xl">
        <p className="save-text">SAVE</p>
      </div>
      <div className="absolute bottom-[15%] left-[10%] z-2 flex items-end text-6xl">
        <span className="font-fontFour the-text absolute bottom-[-50px] left-0 text-8xl">
          the
        </span>
        <p className="date-text absolute bottom-[-30px] left-20">DATE</p>
      </div>
    </div>
  );
};

export default Seperator;
