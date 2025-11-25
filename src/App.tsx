import Greeting from "@intro/Greeting";
import Main from "@main/Main";
import useAppStore from "@store/appStore";
import { APP_STATE } from "@utils/config";

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
