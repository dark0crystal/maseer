import { create } from "zustand";

interface FormState {
  title: string;
  description:string;
  price: string;
  activityType: string;
  features: string[];
  images: string[];
  setTitle: (title: string) => void;
  setDescription:(description: string) => void;
  setPrice: (price: string) => void;
  setFeatures: (features: string[]) => void;
  setImages: (images: string[]) => void;
  setActivityType: (type: string) => void;
}

export const useFormStore = create<FormState>((set) => ({
  title: "",
  description : "",
  price: "",
  features: [],
  images: [],
  activityType: "",
  setTitle: (title) => set({ title }),
  setDescription:(description) => set({ description }),
  setPrice: (price) => set({ price }),
  setFeatures: (features) => set({ features }),
  setImages: (images) => set({ images }),
  setActivityType: (type) => set({ activityType: type }),
}));
