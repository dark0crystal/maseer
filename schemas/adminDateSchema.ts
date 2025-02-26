
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Define the schema for admin date configuration
export const adminDateSchema = z.object({
  isUserSelectable: z.boolean(),
  specificDates: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
}).refine(
  (data) => {
    if (!data.isUserSelectable && (!data.specificDates?.start || !data.specificDates?.end)) {
      return false;
    }
    return true;
  },
  {
    message: "Specific dates are required when user selection is disabled",
    path: ["specificDates"],
  }
);
