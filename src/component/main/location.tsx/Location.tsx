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
      });
    }
  });

  return (
    <div className="location-section relative flex flex-col items-center justify-center gap-7 text-center text-[#928362]">
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
        <p className="location-direction font-fontTwo pt-4 text-2xl uppercase">
          Chỉ đường
        </p>
      </div>
      <img
        src={imageMap.bg6}
        className="absolute bottom-0 left-0 z-1 translate-y-1/2"
      />
    </div>
  );
};

export default Location;
