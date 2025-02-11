import { z } from "zod";


export const reservationSchema = z.object({
  dates: z
    .array(
      z.object({
        start: z.string(),
        end: z.string(),
      })
    )
    .min(1, "Please select at least one date range"),
});