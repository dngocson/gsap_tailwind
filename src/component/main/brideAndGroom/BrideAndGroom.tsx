import { imageMap } from "@/imageMap";
import { useRef } from "react";

const BrideAndGroom = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-fit flex-col items-center justify-center bg-cover bg-center py-16 text-[#928362]"
      style={{ backgroundImage: `url(${imageMap.bg3})` }}
    >
      <h2 className="font-fontTwo z-1 text-3xl tracking-widest">
        THE STORY <span className="font-fontFour text-5xl">of</span> LOVE
      </h2>
    </div>
  );
};

export default BrideAndGroom;
