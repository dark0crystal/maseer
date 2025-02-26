import { create } from "zustand";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface FormState {
  title: string;
  description: string;
  price: number;
  activityType: string;
  features: string[];
  images: string[];
  governorate: string;
  city: string;
  coordinates: Coordinates | null;
  availableSeats: number;
  genderPreference: "male" | "female" | "both";
  allowPets: boolean;
  coverImage: string;
  setCoverImage: (coverImage: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setPrice: (price: number) => void;
  setFeatures: (features: string[]) => void;
  setImages: (images: string[]) => void;
  setActivityType: (type: string) => void;
  setGovernorate: (gov: string) => void;
  setCity: (city: string) => void;
  setCoordinates: (coordinates: Coordinates) => void;
//   setAvailableSeats: (seats: number) => void;
  incrementSeat:(availableSeats:number) => void;
  decrementSeat:(availableSeats:number) => void;
  setGenderPreference: (preference: "male" | "female" | "both") => void;
  setAllowPets: (allow: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
    title: "",
    description: "",
    price: 0,
    features: [],
    images: [],
    activityType: "",
    governorate: "",
    city: "",
    coordinates: null,
    availableSeats: 0,
    genderPreference: "both",
    allowPets: false,
    coverImage: "",
    setCoverImage: (coverImage) => set({ coverImage }),
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setPrice: (price) => set({ price }),
    setFeatures: (features) => set({ features }),
    setImages: (images) => set({ images }),
    setActivityType: (type) => set({ activityType: type }),
    setGovernorate: (gov) => set({ governorate: gov }),
    setCity: (city) => set({ city }),
    setCoordinates: (coordinates) => set({ coordinates }),
    incrementSeat: () => set((state) => ({ availableSeats: state.availableSeats + 1 })),
    decrementSeat: () => set((state) => ({ availableSeats: Math.max(0, state.availableSeats - 1) })),
    setGenderPreference: (preference) => set({ genderPreference: preference }),
    setAllowPets: (allow) => set({ allowPets: allow }),
  }));
  
