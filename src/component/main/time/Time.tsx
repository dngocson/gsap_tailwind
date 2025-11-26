import { imageMap } from "@/imageMap";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatTime } from "@/utils/util";

gsap.registerPlugin(ScrollTrigger);

const Time = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const prevTimeRef = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(0, 0, 0, 0);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const animateFlip = (key: keyof typeof timeLeft) => {
        if (
          prevTimeRef.current[key] !== timeLeft[key] &&
          prevTimeRef.current[key] !== 0
        ) {
          const selector = `.time-${key}`;
          const tl = gsap.timeline();

          tl.to(selector, {
            rotationX: 90,
            duration: 0.2,
            ease: "power2.in",
          }).to(selector, {
            rotationX: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      };

      (Object.keys(timeLeft) as Array<keyof typeof timeLeft>).forEach(
        animateFlip,
      );
      prevTimeRef.current = { ...timeLeft };
    },
    { dependencies: [timeLeft], scope: containerRef },
  );

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current) return;
      setTimeout(() => {
        ScrollTrigger.clearScrollMemory("manual");

        // HG Letters Timeline
        const hgLettersTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hg-letters",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        });

        hgLettersTl.from(".hg-letters", {
          opacity: 0,
          y: -30,
          rotationX: -90,
          stagger: 0.15,
          duration: 1.25,
          ease: "back.out(2)",
        });

        // Intro Text Timeline
        const introTextTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".intro-text",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        });

        introTextTl.from(".intro-text", {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
        });

        // Countdown Container Timeline
        const countdownContainerTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".countdown",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        countdownContainerTl.from(".countdown-container", {
          opacity: 0,
          y: 50,
          scale: 0.8,
          stagger: 0.15,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        });

        // Time Value Timeline
        const timeValueTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".time-value",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        timeValueTl.from(".time-value", {
          opacity: 0,
          rotationX: -360,
          stagger: 0.12,
          duration: 1,
          ease: "power2.out",
        });

        // Time Separator Timeline
        const timeSeparatorTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".time-value",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        timeSeparatorTl.from(".time-separator", {
          opacity: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: "power3.out",
        });

        // Time Label Timeline
        const timeLabelTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".time-value",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        timeLabelTl.from(".time-label", {
          opacity: 0,
          y: -10,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        });

        // Letter Images Timeline
        const letterImagesTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".letter-image-1",
            start: "top 80%",

            toggleActions: "play none none none",
          },
        });

        letterImagesTl.from(".letter-image-1, .letter-image-2", {
          opacity: 0,
          y: 100,
          rotation: (i) => (i === 0 ? -15 : 35),
          stagger: 0.5,
          duration: 1,
          ease: "back.out(2)",
        });
      }, 1000);
    },
    { scope: containerRef },
  );

  const onLetterImageClickHandler = contextSafe(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const element = e.currentTarget;
      const classList = element.classList;
      const originalRotation = classList.contains("letter-image-1") ? 12 : -6;
      gsap.killTweensOf(element);

      const tl = gsap.timeline();
      tl.to(element, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.in",
      }).to(element, {
        rotate: originalRotation,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  );
  return (
    <div
      ref={containerRef}
      className="relative flex h-fit flex-col items-center justify-center gap-12 bg-cover bg-center py-24 text-[#928362]"
      style={{ backgroundImage: `url(${imageMap.bg10})` }}
    >
      <img src={imageMap.bg5} className="absolute top-0 left-0" />
      <img src={imageMap.bg11} className="absolute right-0 bottom-0" />
      <div className="z-1 flex flex-col text-center">
        <div className="relative flex justify-center text-8xl">
          <p className="hg-letters font-fontThree absolute left-[47.5%] -translate-x-1/2">
            H
          </p>
          <p className="hg-letters font-fontOne absolute top-[28.5%] left-[52.5%] -translate-x-1/2">
            G
          </p>
          <p className="invisible">HG</p>
        </div>
        <p className="intro-text font-fontTwo px-20 pt-6 text-[21px] leading-12 uppercase">
          We will become husband and wife in
        </p>
      </div>

      <div className="countdown z-1 -mt-4 flex items-center gap-2">
        <div className="countdown-container flex flex-col items-center gap-2">
          <div className="time-days time-value font-fontTwo text-3xl">
            {formatTime(timeLeft.days)}
          </div>
          <div className="time-label font-fontTwo text-sm tracking-wider uppercase">
            Days
          </div>
        </div>
        <span className="time-separator font-fontTwo self-start text-3xl">
          :
        </span>
        <div className="countdown-container flex flex-col items-center gap-2">
          <div className="time-hours time-value font-fontTwo text-3xl">
            {formatTime(timeLeft.hours)}
          </div>
          <div className="time-label font-fontTwo text-sm tracking-wider uppercase">
            Hours
          </div>
        </div>
        <span className="time-separator font-fontTwo self-start text-3xl">
          :
        </span>
        <div className="countdown-container flex flex-col items-center gap-2">
          <div className="time-minutes time-value font-fontTwo text-3xl">
            {formatTime(timeLeft.minutes)}
          </div>
          <div className="time-label font-fontTwo text-sm tracking-wider uppercase">
            Minutes
          </div>
        </div>
        <span className="time-separator font-fontTwo self-start text-3xl">
          :
        </span>
        <div className="countdown-container flex flex-col items-center gap-2">
          <div className="time-seconds time-value seconds-value font-fontTwo text-3xl">
            {formatTime(timeLeft.seconds)}
          </div>
          <div className="time-label font-fontTwo text-sm tracking-wider uppercase">
            Seconds
          </div>
        </div>
      </div>

      <div className="relative w-5/6 pt-12">
        <img className="z-1" src={imageMap.anh_thu_2} />
        <img
          className="absolute top-3/7 z-2 -translate-y-1/2"
          src={imageMap.anh_thu_4}
        />
        <img className="absolute bottom-0 z-3" src={imageMap.anh_thu_1} />

        <div
          onClick={onLetterImageClickHandler}
          className="letter-image-1 absolute top-2/5 left-3/4 z-2 aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 rotate-12 border-8 border-white bg-white"
        >
          <div className="flex h-full flex-col items-center justify-center overflow-hidden">
            <img
              src={imageMap.letter_2}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div
          onClick={onLetterImageClickHandler}
          className="letter-image-2 absolute top-3/5 left-2/6 z-2 aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 -rotate-6 border-8 border-white bg-white"
        >
          <div className="flex h-full flex-col items-center justify-center overflow-hidden">
            <img
              src={imageMap.letter_1}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
