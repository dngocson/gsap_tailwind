/* eslint-disable react-hooks/refs */

import { imageMap } from "@/imageMap";
import useAppStore from "@/store/appStore";
import { APP_STATE } from "@/utils/config";
import { getInnerWidthAndHeight } from "@/utils/util";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const shapes = [
  {
    name: "Hand",
    path: "M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5 M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5 M14 10.5a1.5 1.5 0 0 1 3 0v1.5 M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47",
    fill: "none",
    stroke: "currentColor",
    color: "var(--color-primary-100)",
  },
  {
    name: "Heart",
    path: "M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z",
    fill: "currentColor",
    stroke: "none",
    color: "#ef4444",
  },
] as const;

const Greeting = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageTitle = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLHeadingElement>(null);
  const allowToClick = useRef(false);
  const isClicked = useRef(false);

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      },
    );

    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.6,
        rotation: -5,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.6",
    );

    tl.fromTo(
      imageTitle.current,
      {
        opacity: 0,
        scale: 0.6,
        rotation: 25,
        transformOrigin: "0% 0%",
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.3",
    );

    tl.fromTo(
      dateRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4",
    );

    tl.set(document.getElementById("letterIconPath"), {
      attr: {
        d: shapes[0].path,
        fill: shapes[0].fill,
        stroke: shapes[0].stroke,
      },
    });

    tl.to(document.getElementById("letterIconSvg"), {
      y: -10,
      duration: 0.5,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
      onRepeat: () => {
        allowToClick.current = true;
      },
    });
  }, []);

  const clickLetterHandler = contextSafe(() => {
    if (isClicked.current || !allowToClick.current) return;
    isClicked.current = true;

    const pathElement = document.getElementById("letterIconPath");
    const svgElement = document.getElementById("letterIconSvg");
    if (!pathElement || !svgElement) return;

    const tl = gsap.timeline();
    gsap.killTweensOf(svgElement);

    gsap.set(svgElement, { transformOrigin: "50% 50%", opacity: 0.5 });

    tl.to(svgElement, {
      scale: 1.5,
      rotate: 15,
      opacity: 0.5,
      duration: 0.5,
      ease: "power2.inOut",
      color: shapes[1].color,
      fill: shapes[1].fill,
    });

    tl.to(
      pathElement,
      {
        morphSVG: { shape: shapes[1].path, shapeIndex: 1 },
        duration: 1,
        ease: "power2.inOut",
        attr: {
          fill: shapes[1].fill,
          stroke: shapes[1].stroke,
        },
      },
      "<",
    );
    const moveY = getInnerWidthAndHeight().height * 0.35;
    const moveX = getInnerWidthAndHeight().width * 0.1;
    tl.to(
      svgElement,
      {
        scale: 8.25,
        opacity: 0.4,
        duration: 2.5,
        y: -moveY,
        x: -moveX,
        ease: "power2.inOut",
        filter: "drop-shadow(0 0 20px rgba(255, 0, 0, 0.35))",
        onComplete: () => {
          setTimeout(() => {
            setAppState(APP_STATE.MAIN);
          }, 500);
        },
      },
      "-=0.4",
    );
  });

  const setAppState = useAppStore((store) => store.setAppState);

  return (
    <div className="relative flex h-screen flex-col justify-center">
      <img src={imageMap.bg1} alt="" />
      <div className="relative flex-1">
        <img className="h-full w-full" src={imageMap.bg10} />
        <img className="absolute right-0 bottom-0" src={imageMap.bg11} />
      </div>
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <h3
          ref={titleRef}
          className="font-fontThree text-center text-5xl leading-14 text-[#928362]"
        >
          Thùy Trang <br />& <br />
          Thanh Hoàng
        </h3>
        <div ref={imageRef} className="relative mx-auto w-5/6">
          <img onClick={clickLetterHandler} src={imageMap.anh_thu_3} alt="" />
          <div
            ref={imageTitle}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c3b8a2]"
          >
            <p className="font-fontThree absolute -left-2 -translate-x-1/2 -translate-y-1/2 text-7xl text-[#c3b8a2]">
              H
            </p>
            <p className="font-fontOne absolute top-4 left-2 -translate-x-1/2 -translate-y-1/2 text-7xl text-[#c3b8a2]">
              G
            </p>
          </div>
        </div>
        <h4
          ref={dateRef}
          className="font-fontTwo mx-auto w-5/6 text-center text-3xl tracking-widest text-[#928362]"
        >
          16.11.2025
        </h4>
      </div>

      <div className="absolute top-[62%] left-[50%]">
        <svg
          id="letterIconSvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-15 w-15"
          style={{ color: shapes[0].color, transform: "rotate(-25deg)" }}
        >
          <path id="letterIconPath" />
        </svg>
      </div>
    </div>
  );
};

export default Greeting;
