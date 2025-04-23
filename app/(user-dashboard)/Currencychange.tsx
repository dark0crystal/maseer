import {View, Text} from "react-native"
import { Picker } from "@react-native-picker/picker";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useEffect,useState } from "react";

export default function CurrencyChange(){
   
     
    const { currency,setCurrency, convertPrice } = useCurrencyStore(); // Access Zustand store

    return(
        <View>
                 {/* Currency Picker */}
          <View className="px-3 py-2">
            <Text className="text-black text-lg font-semibold">Select Currency:</Text>
            <Picker
              selectedValue={currency}
              onValueChange={async (newCurrency) => {
                await setCurrency(newCurrency);
               
              }}
            >
              <Picker.Item label="OMR - Omani Rial" value="OMR"  color="black"/>
              <Picker.Item label="USD - US Dollar" value="USD" color="black"/>
              <Picker.Item label="EUR - Euro" value="EUR" color="black"/>
              <Picker.Item label="GBP - British Pound" value="GBP" color="black"/>
            </Picker>
          </View>
        </View>
    )
}