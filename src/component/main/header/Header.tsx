import { imageMap } from "@/imageMap";

const Header = () => {
  return (
    <div className="relative w-full">
      <img src={imageMap.header2} alt="Header Logo" />
      <h2 className="font-fontFour absolute top-[15%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-6xl text-white drop-shadow-[0_5px_5px_black]">
        We're getting married!
      </h2>

      <div className="font-fontOne absolute bottom-[5%] left-1/2 w-full -translate-x-1/2 transform text-center text-4xl text-white">
        <h3 className="drop-shadow-[0_5px_5px_black]">
          Thùy Giang & Thanh Hoàng
        </h3>
        <p className="drop-shadow-[0_5px_5px_black]">16.11.2025</p>
      </div>
    </div>
  );
};

export default Header;
