import { imageMap } from "@/imageMap";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDialogElement>(null);

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

  return (
    <div>
      <dialog ref={modelRef} className="backdrop:bg-black/50">
        <div className="flex h-full w-full items-center justify-center">
          <p>THIS SHOULD BE ON THE CENTER</p>
        </div>
      </dialog>

      <div className="relative z-50 mx-auto w-full max-w-4xl" ref={carouselRef}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="embla__slide min-w-0 flex-[0_0_100%]">
                <div className="relative overflow-hidden border-2 border-[rgb(146,131,98,.25)] bg-white shadow-lg">
                  <img
                    onClick={() => {
                      modelRef.current?.showModal();
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
    </div>
  );
};

export default Carousel;
