import { useGSAP } from "@gsap/react";
import Greeting from "@intro/Greeting";
import Main from "@main/Main";
import useAppStore from "@store/appStore";
import { APP_STATE } from "@utils/config";
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { GSDevTools } from "gsap/GSDevTools";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  GSDevTools,
  MotionPathPlugin,
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  TextPlugin,
);

function App() {
  const appState = useAppStore((state) => state.appState);
  return (
    <div className="relative h-full min-h-screen w-full transition-colors duration-300">
      {appState === APP_STATE.INTRO && <Greeting />}
      {appState === APP_STATE.MAIN && <Main />}
    </div>
  );
}

export default App;
