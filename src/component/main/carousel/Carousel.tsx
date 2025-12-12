import { imageMap } from "@/imageMap";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const images = [
  imageMap.carousel_1,
  imageMap.carousel_2,
  imageMap.carousel_3,
  imageMap.carousel_4,
  imageMap.carousel_5,
  imageMap.carousel_6,
  imageMap.carousel_7,
  imageMap.carousel_8,
  imageMap.carousel_9,
  imageMap.carousel_10,
  imageMap.carousel_11,
  imageMap.carousel_12,
  imageMap.carousel_13,
  imageMap.carousel_14,
  imageMap.carousel_15,
] as const;

const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const modalContainer = document.getElementById("modal_container");
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const navigationDirection = useRef<"left" | "right" | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        playOnInit: true,
        delay: 2000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ],
  );

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    align: "center",
    dragFree: true,
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
      if (emblaThumbsApi) emblaThumbsApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi],
  );

  useGSAP(() => {
    if (carouselRef.current) {
      const currentSlide = carouselRef.current.querySelector(
        `.embla__slide:nth-child(${selectedIndex + 1})`,
      );
      if (currentSlide) {
        gsap.fromTo(
          currentSlide,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
        );
      }
    }
  }, [selectedIndex]);

  useGSAP(() => {
    if (modalContentRef.current && modalImage) {
      const direction = navigationDirection.current;

      if (direction === "left") {
        gsap.fromTo(
          modalContentRef.current,
          {
            opacity: 0.5,
            x: -150,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
          },
        );
      } else if (direction === "right") {
        gsap.fromTo(
          modalContentRef.current,
          {
            opacity: 0.5,
            x: 150,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
          },
        );
      } else {
        gsap.fromTo(
          modalContentRef.current,
          {
            opacity: 0.7,
            scale: 0.7,
            y: 15,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
        );
      }

      navigationDirection.current = null;
    }
  }, [modalImage]);

  const closeModalWithAnimation = useCallback(() => {
    if (modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        opacity: 0.75,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setModalImage(null),
      });
    } else {
      setModalImage(null);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("reInit", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      if (emblaThumbsApi)
        emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi, emblaThumbsApi]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev();
        emblaApi?.plugins()?.autoplay?.reset();
        navigationDirection.current = "left";
        setModalImage(
          images[(selectedIndex - 1 + images.length) % images.length],
        );
      } else if (e.key === "ArrowRight") {
        scrollNext();
        emblaApi?.plugins()?.autoplay?.reset();
        navigationDirection.current = "right";
        setModalImage(images[(selectedIndex + 1) % images.length]);
      } else if (e.key === "ArrowUp") {
        setModalImage(selectedIndex !== null ? images[selectedIndex] : null);
      } else if ((e.key === "Escape" || e.key === "ArrowDown") && modalImage) {
        closeModalWithAnimation();
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: carouselRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        window.addEventListener("keydown", handleKeyDown);
      },
      onEnterBack: () => {
        window.addEventListener("keydown", handleKeyDown);
      },
      onLeave: () => {
        window.removeEventListener("keydown", handleKeyDown);
      },
      onLeaveBack: () => {
        window.removeEventListener("keydown", handleKeyDown);
      },
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      scrollTrigger.kill();
    };
  }, [
    scrollPrev,
    scrollNext,
    emblaApi,
    selectedIndex,
    modalImage,
    closeModalWithAnimation,
  ]);

  return (
    <div>
      <div className="relative z-50 mx-auto w-full max-w-4xl" ref={carouselRef}>
        {/* ScrollTrigger will monitor this div */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="embla__slide min-w-0 flex-[0_0_100%]">
                <div className="relative overflow-hidden border-2 border-[rgb(146,131,98,.25)] bg-white shadow-lg">
                  <img
                    onClick={() => {
                      setModalImage(image);
                    }}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white/50"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <svg
            className="h-6 w-6 text-[#928362]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white/50"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <svg
            className="h-6 w-6 text-[#928362]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="my-4 overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`min-w-0 flex-[0_0_25%] cursor-pointer transition-opacity duration-200 ${
                index === selectedIndex ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => {
                scrollTo(index);
                emblaApi?.plugins()?.autoplay?.reset();
              }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="aspect-square w-full origin-center rounded border border-gray-300 object-cover object-[20%_20%]"
              />
            </div>
          ))}
        </div>
      </div>

      {modalImage &&
        modalContainer &&
        createPortal(
          <div
            className="pointer-events-auto fixed inset-0 flex h-full w-full items-center justify-center bg-black/70"
            onClick={closeModalWithAnimation}
          >
            <div ref={modalContentRef} className="relative max-w-[85%]">
              <img
                src={modalImage}
                className="max-h-full object-contain"
                alt="displayed modal image"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={closeModalWithAnimation}
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
                aria-label="Close modal"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>,
          modalContainer,
        )}
    </div>
  );
};

export default Carousel;
