import { imageMap } from "@/imageMap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const BrideAndGroom = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading animation
      gsap.from(".bride-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          markers: false,
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      // Bride image animation
      gsap.from(".bride-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          markers: false,
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.2,
      });

      // Bride text animation
      gsap.from(".bride-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          markers: false,
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
      });

      // Groom text animation
      gsap.from(".groom-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          markers: false,
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.4,
      });

      // Groom image animation
      gsap.from(".groom-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          markers: false,
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.4,
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-fit flex-col items-center justify-center gap-12 overflow-hidden bg-cover bg-center py-16 text-[rgb(146,131,98)]"
      style={{ backgroundImage: `url(${imageMap.bg3})` }}
    >
      <h2 className="bride-heading font-fontTwo z-1 text-3xl tracking-widest">
        THE STORY <span className="font-fontFour text-5xl">of</span> LOVE
      </h2>
      <div>
        <div className="grid grid-cols-2">
          <div className="bride-image z-5 ml-4 h-56 w-56 -rotate-12">
            <img
              src={imageMap.bride}
              alt="bride"
              className="h-full w-full border border-[rgb(146,131,98,.25)] bg-white object-cover object-top p-4"
            />
          </div>
          <div className="bride-text flex flex-col items-center">
            <p className="font font-fontFour pt-8 text-5xl">Cô dâu</p>
            <p className="text-2xl uppercase">
              thùy <br /> giang
            </p>
          </div>
        </div>

        <div className="-mt-10 grid grid-cols-2">
          <div className="groom-text flex h-full flex-col items-center justify-end pb-8">
            <p className="font font-fontFour text-5xl">Chú rể</p>
            <p className="text-2xl uppercase">
              thanh <br /> hoàng
            </p>
          </div>
          <div className="groom-image h-56 w-56 rotate-10">
            <img
              src={imageMap.groom}
              alt="groom"
              className="h-full w-full border border-[rgb(146,131,98,.35)] bg-white object-cover object-top p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrideAndGroom;
