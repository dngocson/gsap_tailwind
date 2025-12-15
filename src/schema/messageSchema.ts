import z from "zod";

export const rsvpSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập tên của bạn"),

  willAttend: z
    .enum(["default", "yes", "no"])
    .refine((v) => v !== "default", {
      message: "Vui lòng chọn tham dự hay không",
    }),

  personalMessage: z.string(),

  guestCount: z
    .enum(["default", "0", "1", "2", "3", "4"])
    .refine((v) => v !== "default", { message: "Vui lòng chọn số khách" }),

  guestAffiliation: z.enum(["default", "groom_side", "bride_side"]),
});

export type RsvpFormData = z.infer<typeof rsvpSchema>;
