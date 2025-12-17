import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Album from "./album/Album";
import Booking from "./booking/Booking";
import BrideAndGroom from "./brideAndGroom/BrideAndGroom";
import Carousel from "./carousel/Carousel";
import Header from "./header/Header";
import Location from "./location.tsx/Location";
import Seperator from "./seperator/Seperator";
import Time from "./time/Time";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MusicIcon from "@/icon/MusicIcon";

const Main = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [iconPosition, setIconPosition] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containserRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const spinAnimationRef = useRef<gsap.core.Tween | null>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        gsap.to(audioRef.current, {
          volume: 0,
          duration: 0.25,
          onComplete: () => {
            audioRef.current?.pause();
          },
        });
        spinAnimationRef.current?.pause();
      } else {
        audioRef.current.play();
        gsap.to(audioRef.current, {
          volume: 1,
          duration: 0.25,
        });
        spinAnimationRef.current?.resume();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (containserRef.current) {
        const parentRect = containserRef.current.getBoundingClientRect();
        setIconPosition(parentRect.left + parentRect.width * 0.85);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, []);

  useGSAP(
    () => {
      if (iconRef.current) {
        spinAnimationRef.current = gsap.to(iconRef.current, {
          rotation: 360,
          duration: 5,
          ease: "none",
          repeat: -1,
        });
      }
    },
    { dependencies: [iconPosition], scope: containserRef },
  );

  return (
    <div ref={containserRef} className="relative">
      <Header />
      <Time />
      <Seperator />
      <Location />
      <BrideAndGroom />
      <Album />
      <Carousel />
      <Booking />

      <audio ref={audioRef} autoPlay loop>
        <source src="/sound/song.mp3" type="audio/mpeg" />
      </audio>

      {iconPosition > 0 && (
        <>
          <div
            ref={iconRef}
            className="fixed bottom-4 z-50 flex cursor-pointer rounded-full bg-[#928362] p-2"
            onClick={togglePlay}
            style={{
              left: iconPosition,
              transition: "left 0.2s ease-out",
            }}
          >
            <div>
              <MusicIcon color="white" size={30} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
