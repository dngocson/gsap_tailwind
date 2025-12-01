import { imageMap } from "@/imageMap";
import { useRef } from "react";

const Location = () => {
  const separatorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-7 text-center text-[#928362]">
      <img className="absolute top-0 z-2" src={imageMap.bg1} />
      <img className="absolute top-0 h-full" src={imageMap.bg10} />
      <img className="absolute right-0 bottom-0" src={imageMap.bg11} />

      <div className="z-10 flex w-full flex-col items-center gap-8">
        <div className="font-fontTwo z-10 flex w-full items-center justify-evenly text-center text-lg">
          <div className="flex flex-col justify-center text-center">
            <p className="font-bold uppercase">Nhà gái</p>
            <p>Ông. Võ Văn Thoa</p>
            <p>Bà. Lê Thị Hạnh</p>
          </div>

          <div
            ref={separatorRef}
            className="h-32 w-0.5 bg-linear-to-b from-transparent via-[#928362] to-transparent"
          ></div>

          <div className="flex flex-col justify-center text-center">
            <p className="font-bold uppercase">nhà trai</p>
            <p>Ông. Khổng Văn Hải</p>
            <p>Bà. Nguyễn Thị Hào</p>
          </div>
        </div>
        <h3 className="uppercase">
          trân trọng mời tham dự lễ <br /> thành hôn của hai con chúng tôi
        </h3>
      </div>

      <div className="z-10 flex flex-col gap-2">
        <p className="text-5xl">THÙY GIANG</p>
        <p className="font-fontFour text-6xl">and</p>
        <p className="text-5xl">THANH HOÀNG</p>
      </div>

      <p className="z-10">Được tổ chức vào lúc</p>

      <div className="font-fontTwo z-10 flex flex-col items-center justify-items-center border-t-2 border-b-2 border-[#928362] p-2 text-[30px] leading-[1.6] uppercase">
        <p>11:00 - chủ nhật</p>
        <p>16.11.2025</p>
      </div>

      <div className="z-10 flex flex-col items-center justify-items-center gap-1 text-center">
        <p className="font-fontTwo text-lg">Địa điểm:</p>
        <p className="text-xl uppercase">nhà hàng nam châu hội quán</p>
        <p className="font-fontTwo italic">
          04 Kim Long, Phường Kim Long, Thành phố Huế
        </p>
        <p className="font-fontTwo pt-4 text-2xl uppercase">Chỉ đường</p>
      </div>
    </div>
  );
};

export default Location;
