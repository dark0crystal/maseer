import { create } from 'zustand'

type FormFields ={
    price:number 
    incresePrice :()=> void
    decreasePrice :()=> void
}

export const useAddNewActivity  = create<FormFields>((set)=>({
    price:0,
    incresePrice: ()=>{set((state)=>({price :state.price+1}));},
    decreasePrice: ()=>{set((state)=>({price :state.price-1}));},
}))