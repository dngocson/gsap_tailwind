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
    </div>
  );
};

export default Main;
