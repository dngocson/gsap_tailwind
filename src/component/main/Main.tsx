import Album from "./album/Album";
import Booking from "./booking/Booking";
import BrideAndGroom from "./brideAndGroom/BrideAndGroom";
import Carousel from "./carousel/Carousel";
import Header from "./header/Header";
import Location from "./location.tsx/Location";
import Seperator from "./seperator/Seperator";
import Time from "./time/Time";

const Main = () => {
  return (
    <div className="relative">
      <Header />
      <Time />
      <Seperator />
      <Location />
      <BrideAndGroom />
      <Album />
      <Carousel />
      <Booking />
    </div>
  );
};

export default Main;
