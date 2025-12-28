import { imageMap } from "@/imageMap";
import { rsvpSchema } from "@/schema/messageSchema";
import { useForm } from "@tanstack/react-form";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import toast from "react-hot-toast";

const Booking = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (textRef.current) {
        gsap.set(textRef.current, {
          opacity: 0,
          y: 30,
        });

        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (formRef.current) {
        gsap.set(formRef.current, {
          opacity: 0,
          y: 50,
        });

        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Stagger animation for form fields
        const formFields = formRef.current.querySelectorAll(
          "input, textarea, select, button",
        );
        gsap.set(formFields, {
          opacity: 0,
          y: 20,
        });

        gsap.to(formFields, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: containerRef },
  );

  const form = useForm({
    defaultValues: {
      fullName: "",
      willAttend: "default",
      personalMessage: "",
      guestCount: "default",
      guestAffiliation: "default",
    },
    validators: {
      onChange: rsvpSchema,
    },
    onSubmit: async () => {
      toast.success("Cảm ơn bạn đã xác nhận nhé!");
    },
    onSubmitInvalid() {
      const InvalidInput = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLInputElement;

      InvalidInput?.focus();
    },
  });

  return (
    <div
      ref={containerRef}
      className="realme-neo2:py-12 relative flex h-fit min-h-[70dvh] flex-col gap-12 bg-cover bg-center py-6 text-[#928362]"
      style={{ backgroundImage: `url(${imageMap.bg10})` }}
    >
      <img src={imageMap.bg5} className="absolute top-0 left-0 z-1" />
      <img src={imageMap.bg11} className="absolute right-0 bottom-0 z-1" />

      <div
        ref={textRef}
        className="realme-neo2:text-sm z-2 flex flex-col items-center gap-4 px-6 text-center text-base leading-relaxed font-light"
      >
        <p>
          Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một
          cách chu đáo nhất.
        </p>
        <p className="text-base">Trân trọng</p>
      </div>

      <form
        ref={formRef}
        className="font-fontTwo z-10 flex w-5/6 flex-col gap-4 self-center"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="fullName"
          children={(field) => (
            <div className="relative">
              <input
                className={`squircle w-full rounded-2xl border px-3 py-2 text-sm placeholder:text-sm placeholder:text-[#928362] focus:ring-0 focus:outline-none ${
                  field.state.meta.errors.length > 0 ? "border-red-500" : ""
                }`}
                name={field.name}
                value={field.state.value}
                placeholder="Tên của bạn"
                aria-invalid={
                  !field.state.meta.isValid && field.state.meta.isTouched
                }
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
              />
              {field.state.meta.errors.length > 0 && (
                <div className="absolute top-full left-0 z-20 mt-1 rounded bg-red-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                  {String(
                    field.state.meta.errors[0]?.message ||
                      field.state.meta.errors[0],
                  )}
                  <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 transform bg-red-500"></div>
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="personalMessage"
          children={(field) => (
            <div className="relative">
              <textarea
                className={`squircle w-full resize-none rounded-2xl border px-3 py-2 text-sm placeholder:text-sm placeholder:text-[#928362] focus:ring-0 focus:outline-none ${
                  field.state.meta.errors.length > 0 ? "border-red-500" : ""
                }`}
                name={field.name}
                value={field.state.value}
                placeholder="Gửi lời nhắn tới cô dâu và chú rể"
                rows={4}
                aria-invalid={
                  !field.state.meta.isValid && field.state.meta.isTouched
                }
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="absolute top-full left-0 z-20 mt-1 rounded bg-red-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                  {String(
                    field.state.meta.errors[0]?.message ||
                      field.state.meta.errors[0],
                  )}
                  <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 transform bg-red-500"></div>
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="willAttend"
          children={(field) => (
            <div className="relative">
              <select
                className={`squircle w-full cursor-pointer appearance-none rounded-2xl border px-3 py-2 pr-10 text-sm text-[#928362] shadow-sm transition-all hover:shadow-md focus:ring-0 focus:outline-none ${
                  field.state.meta.errors.length > 0 ? "border-red-500" : ""
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23928362'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                  backgroundRepeat: "no-repeat",
                }}
                name={field.name}
                value={field.state.value}
                aria-invalid={
                  !field.state.meta.isValid && field.state.meta.isTouched
                }
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="default" disabled>
                  Bạn sẽ tham dự chứ?
                </option>
                <option value="yes">Có, tôi sẽ tham dự</option>
                <option value="no">Rất tiếc, tôi không thể tham dự</option>
              </select>
              {field.state.meta.errors.length > 0 && (
                <div className="absolute top-full left-0 z-20 mt-1 rounded bg-red-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                  {String(
                    field.state.meta.errors[0]?.message ||
                      field.state.meta.errors[0],
                  )}
                  <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 transform bg-red-500"></div>
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="guestCount"
          children={(field) => (
            <div className="relative">
              <select
                className={`squircle w-full cursor-pointer appearance-none rounded-2xl border px-3 py-2 pr-10 text-sm text-[#928362] shadow-sm transition-all hover:shadow-md focus:ring-0 focus:outline-none ${
                  field.state.meta.errors.length > 0 ? "border-red-500" : ""
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23928362'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                  backgroundRepeat: "no-repeat",
                }}
                name={field.name}
                value={field.state.value}
                aria-invalid={
                  !field.state.meta.isValid && field.state.meta.isTouched
                }
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="default" disabled>
                  Bạn tham dự cùng ai
                </option>
                <option value="0">Chỉ mình tôi</option>
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người</option>
              </select>
              {field.state.meta.errors.length > 0 && (
                <div className="absolute top-full left-0 z-20 mt-1 rounded bg-red-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                  {String(
                    field.state.meta.errors[0]?.message ||
                      field.state.meta.errors[0],
                  )}
                  <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 transform bg-red-500"></div>
                </div>
              )}
            </div>
          )}
        />

        <form.Field
          name="guestAffiliation"
          children={(field) => (
            <div className="relative">
              <select
                className={`squircle w-full cursor-pointer appearance-none rounded-2xl border px-3 py-2 pr-10 text-sm text-[#928362] shadow-sm transition-all hover:shadow-md focus:ring-0 focus:outline-none ${
                  field.state.meta.errors.length > 0 ? "border-red-500" : ""
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23928362'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                  backgroundRepeat: "no-repeat",
                }}
                name={field.name}
                value={field.state.value}
                aria-invalid={
                  !field.state.meta.isValid && field.state.meta.isTouched
                }
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="default" disabled>
                  Bạn là khách mời của ai
                </option>
                <option value="groom_side">Khách mời cô dâu</option>
                <option value="bride_side">Khách mời chú rể</option>
              </select>
              {field.state.meta.errors.length > 0 && (
                <div className="absolute top-full left-0 z-20 mt-1 rounded bg-red-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                  {String(
                    field.state.meta.errors[0]?.message ||
                      field.state.meta.errors[0],
                  )}
                  <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 transform bg-red-500"></div>
                </div>
              )}
            </div>
          )}
        />

        <button
          className="mt-3 w-full rounded-2xl bg-[#928362] p-2 text-center text-base font-bold text-white uppercase transition-all active:scale-95 active:transition-transform active:duration-75"
          type="submit"
        >
          Gửi lời nhắn & xác nhận
        </button>
      </form>

      <p className="font-fontFour z-20 text-center text-7xl">Thank you!</p>
    </div>
  );
};

export default Booking;
