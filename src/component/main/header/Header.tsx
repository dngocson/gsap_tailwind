import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { imageMap } from "@/imageMap";

const Header = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
    );

    tl.fromTo(
      namesRef.current,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.2)",
      },
      "-=0.5",
    );

    tl.fromTo(
      dateRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4",
    );
  }, []);

  return (
    <div className="relative w-full">
      <img ref={imageRef} src={imageMap.header2} alt="Header Logo" />
      <h2
        ref={titleRef}
        className="font-fontFour absolute top-[15%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-6xl text-white drop-shadow-[0_5px_5px_black]"
      >
        We're getting married!
      </h2>

      <div className="font-fontOne absolute bottom-[5%] left-1/2 w-full -translate-x-1/2 transform text-center text-4xl text-white">
        <h3 ref={namesRef} className="drop-shadow-[0_5px_5px_black]">
          Thùy Giang & Thanh Hoàng
        </h3>
        <p ref={dateRef} className="drop-shadow-[0_5px_5px_black]">
          16.11.2025
        </p>
      </div>
    </div>
  );
};

export default Header;
