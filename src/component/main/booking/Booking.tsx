import { imageMap } from "@/imageMap";
import { rsvpSchema } from "@/schema/messageSchema";
import { useForm } from "@tanstack/react-form";
import { useRef } from "react";

const Booking = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
  });

  return (
    <div
      ref={containerRef}
      className="realme-neo2:py-12 relative flex h-fit min-h-svh flex-col gap-12 bg-cover bg-center py-6 text-[#928362]"
      style={{ backgroundImage: `url(${imageMap.bg10})` }}
    >
      <img src={imageMap.bg5} className="absolute top-0 left-0 z-1" />
      <img src={imageMap.bg11} className="absolute right-0 bottom-0 z-1" />

      <div className="realme-neo2:text-sm z-2 flex flex-col items-center gap-4 px-6 text-center text-base leading-relaxed font-light">
        <p>
          Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một
          cách chu đáo nhất.
        </p>
        <p className="text-base">Trân trọng</p>
      </div>
    </div>
  );
};

export default Booking;
