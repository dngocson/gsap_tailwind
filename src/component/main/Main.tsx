import Album from "./album/Album";
import BrideAndGroom from "./brideAndGroom/BrideAndGroom";
import Carousel from "./carousel/Carousel";

const Main = () => {
  return (
    <div className="relative">
      {/* <Header />
      <Time />
      <Seperator />
      <Location /> */}
      <BrideAndGroom />
      <Album />
      <Carousel />
    </div>
  );
};

export default Main;
