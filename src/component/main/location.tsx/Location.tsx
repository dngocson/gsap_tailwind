import { imageMap } from "@/imageMap";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";

const Location = () => {
  useGSAP(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const invite = SplitText.create(".invite-text", {
          type: "words",
          autoSplit: true,
        });
        const brideAndGroom = SplitText.create(".couple-names", {
          type: "chars",
        });

        gsap.from(".parents-wrapper", {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".parents-block",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(invite.words, {
          opacity: 0,
          y: 20,
          stagger: 0.04,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".invite-text",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(brideAndGroom.chars, {
          yPercent: "random([-100,100])",
          rotation: "random([-30,30])",
          stagger: {
            amount: 0.5,
            from: "center",
          },
          autoAlpha: 0,
          scrollTrigger: {
            trigger: ".name-bride",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".time-intro", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".time-intro",
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".time-block", {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          x: (index) => {
            switch (index) {
              case 0:
                return 0;
              case 1:
                return 75;
              case 2:
                return -70;
              default:
                return 0;
            }
          },

          scrollTrigger: {
            trigger: ".time-block",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(".location-info", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".location-info",
            start: "top 50%",
            toggleActions: "play none none none",
          },
        });

        gsap.fromTo(
          ".location-direction",
          {
            scale: 1,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1.15,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "linear",
            scrollTrigger: {
              trigger: ".location-direction",
              start: "top 60%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }
  });

  return (
    <div className="location-section realme-neo2:pb-0 relative flex min-h-[75vh] flex-col items-center justify-center gap-7 pb-6 text-center text-[#928362]">
      <img className="location-bg-1 absolute top-0 z-2" src={imageMap.bg1} />
      <img
        className="location-bg-10 absolute top-0 h-full"
        src={imageMap.bg3}
      />

      <div className="parents-block z-10 flex w-full flex-col items-center gap-8">
        <div className="parents-wrapper font-fontTwo z-10 flex w-full items-center justify-evenly text-center text-lg">
          <div className="parents-girl flex flex-col justify-center text-center">
            <p className="font-bold uppercase">Nhà gái</p>
            <p className="text-sm">Ông. Võ Văn Thoa</p>
            <p className="text-sm">Bà. Lê Thị Hạnh</p>
          </div>

          <div className="parents-divider h-32 w-0.5 bg-linear-to-b from-transparent via-[#928362] to-transparent" />

          <div className="parents-boy flex flex-col justify-center text-center">
            <p className="font-bold uppercase">nhà trai</p>
            <p className="text-sm">Ông. Khổng Văn Hải</p>
            <p className="text-sm">Bà. Nguyễn Thị Hào</p>
          </div>
        </div>

        <h3 className="invite-text realme-neo2:px-0 px-2 leading-7 uppercase">
          trân trọng mời tham dự <br /> lễ thành hôn của hai con chúng tôi
        </h3>
      </div>

      <div className="couple-names z-10 flex flex-col gap-2">
        <p className="name-bride realme-neo2:text-5xl text-4xl">THÙY GIANG</p>
        <p className="name-and font-fontFour realme-neo2:text-6xl text-5xl">
          and
        </p>
        <p className="name-groom realme-neo2:text-5xl text-4xl">THANH HOÀNG</p>
      </div>

      <p className="time-intro z-10">Được tổ chức vào lúc</p>

      <div className="time-block font-fontTwo z-10 flex flex-col items-center border-t-2 border-b-2 border-[#928362] p-2 text-[30px] leading-[1.6] uppercase">
        <p className="time-block">11:00 - chủ nhật</p>
        <p className="time-block">16.11.2025</p>
      </div>

      <div className="location-info z-10 flex flex-col items-center gap-1 text-center">
        <p className="location-label font-fontTwo text-lg">Địa điểm:</p>
        <p className="location-name text-xl uppercase">
          nhà hàng nam châu hội quán
        </p>
        <p className="location-address font-fontTwo italic">
          04 Kim Long, Phường Kim Long, Thành phố Huế
        </p>
        <a
          target="_blank"
          href="https://www.google.com/maps/dir//82+Th%C3%A2n+V%C4%83n+Nhi%E1%BA%BFp,+An+Ph%C3%BA,+Th%E1%BB%A7+%C4%90%E1%BB%A9c,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7594064,106.7165612,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752676039207c3:0xa49becb0680b129b!2m2!1d106.7536237!2d10.7864477?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
          className="location-direction font-fontTwo flex items-center gap-2 py-4 text-base uppercase"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          Chỉ đường
        </a>
      </div>
      <img
        src={imageMap.bg6}
        className="absolute bottom-0 left-0 z-1 translate-y-1/2"
      />
    </div>
  );
};

export default Location;
