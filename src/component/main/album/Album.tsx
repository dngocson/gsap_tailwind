import { imageMap } from "@/imageMap";
import LoopVideoPictures from "../brideAndGroom/VideoPictures";

const Album = () => {
  return (
    <div className="location-section relative flex h-screen flex-col gap-7 overflow-hidden text-center text-[#928362]">
      <img
        className="location-bg-10 absolute top-0 h-full"
        src={imageMap.bg3}
      />
      <LoopVideoPictures />
      <div className="z-10">
        <div className="grid grid-cols-3 gap-5 text-4xl">
          <div className="flex flex-col pl-3">
            <p className="font-fontFour text-7xl">The</p>
            <p>Album</p>
          </div>
          <div className="relative col-span-2">
            <div className="grid-span-2 absolute -top-10 -right-5 mx-auto h-[270px] w-[270px] rotate-15 overflow-hidden border border-[rgb(146,131,98,.25)] bg-white p-4">
              <img
                className="h-full w-full border border-[rgb(146,131,98,.25)] bg-white object-cover"
                src={imageMap.album_1}
                alt="album-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
