import { z } from "zod";


export const reservationSchema = z.object({
    dates: z
      .object({
        start: z.string(),
        end: z.string(),
      })
      .nullable(),
  });