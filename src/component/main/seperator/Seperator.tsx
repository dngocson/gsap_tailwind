import { imageMap } from "@/imageMap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Seperator = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".seprate_text",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    tl.from(".seprate_text_save", {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "power2.out",
    });
    tl.from(
      ".seprate_text",
      {
        opacity: 0,
        x: 30,
        duration: 1,
        stagger: 0.5,
        ease: "power2.out",
      },
      "-=0.5",
    );
  }, []);

  return (
    <div className="relative text-white">
      <img src={imageMap.seperator} className="brightness-95" />
      <div className="absolute inset-0 bg-black opacity-15" />
      <div className="absolute bottom-[30%] left-[10%] z-2 flex flex-col gap-3 text-6xl">
        <p className="seprate_text_save">SAVE</p>
      </div>
      <div className="absolute bottom-[15%] left-[10%] z-2 flex items-end text-6xl">
        <span className="font-fontFour seprate_text absolute bottom-[-50px] left-0 text-8xl">
          the
        </span>
        <p className="seprate_text absolute bottom-[-30px] left-20">DATE</p>
      </div>
    </div>
  );
};

export default Seperator;
