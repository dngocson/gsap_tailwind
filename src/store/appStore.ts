import { APP_STATE } from "@/utils/config";
import { create } from "zustand";

interface AppState {
  appState: APP_STATE;
  setAppState: (state: APP_STATE) => void;
}

const useAppStore = create<AppState>((set) => ({
  appState: APP_STATE.MAIN,
  setAppState: (appState) => set(() => ({ appState })),
}));

export default useAppStore;
