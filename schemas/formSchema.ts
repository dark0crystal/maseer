import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  activityType: z.string().min(1, "Please select an activity type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  images: z.array(z.string()).min(1, "Upload at least one image"),
});
