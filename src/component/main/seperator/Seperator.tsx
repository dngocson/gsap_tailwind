import { imageMap } from "@/imageMap";

const Seperator = () => {
  return (
    <div className="relative text-white">
      <img src={imageMap.seperator} className="brightness-95" />
      <div className="absolute inset-0 bg-black opacity-15" />
      <div className="absolute bottom-[30%] left-[10%] z-2 flex flex-col gap-3 text-6xl">
        <p>SAVE</p>
      </div>
      <div className="absolute bottom-[15%] left-[10%] z-2 flex items-end text-6xl">
        <span className="font-fontFour absolute bottom-[-50px] left-0 text-8xl">
          the
        </span>
        <p className="absolute bottom-[-30px] left-20">DATE</p>
      </div>
    </div>
  );
};

export default Seperator;
