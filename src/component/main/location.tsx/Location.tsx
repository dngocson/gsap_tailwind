import { imageMap } from "@/imageMap";
import { useRef } from "react";

const Location = () => {
  const separatorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex h-screen flex-col justify-center">
      <img src={imageMap.bg1} />
      <div className="relative flex-1">
        <img className="h-full w-full" src={imageMap.bg10} />
        <img className="absolute right-0 bottom-0" src={imageMap.bg11} />
      </div>
      <div className="font-fontTwo absolute top-0 left-1/2 flex w-[80%] -translate-x-1/2 items-center justify-between text-center text-lg text-[#928362]">
        <div className="flex flex-col items-center">
          <p className="font-bold uppercase">Nhà gái</p>
          <p>Ông. Võ Văn Thoa</p>
          <p>Bà. Lê Thị Hạnh</p>
        </div>

        <div
          ref={separatorRef}
          className="h-32 w-0.5 bg-linear-to-b from-transparent via-[#928362] to-transparent"
        ></div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-bold uppercase">nhà trai</p>
          <p>Ông. Khổng Văn Hải</p>
          <p>Bà. Nguyễn Thị Hào</p>
        </div>
      </div>
    </div>
  );
};

export default Location;
