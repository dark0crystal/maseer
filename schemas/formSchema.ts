import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.string().regex(/^\d+$/, "Price must be a number"),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  images: z.array(z.string()).min(1, "Upload at least one image"),
});
