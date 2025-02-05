import { create } from "zustand";

interface FormState {
  title: string;
  price: string;
  features: string[];
  images: string[];
  setTitle: (title: string) => void;
  setPrice: (price: string) => void;
  setFeatures: (features: string[]) => void;
  setImages: (images: string[]) => void;
}

export const useFormStore = create<FormState>((set) => ({
  title: "",
  price: "",
  features: [],
  images: [],
  setTitle: (title) => set({ title }),
  setPrice: (price) => set({ price }),
  setFeatures: (features) => set({ features }),
  setImages: (images) => set({ images }),
}));
