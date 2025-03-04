import {View, Text} from "react-native"
import { Picker } from "@react-native-picker/picker";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useEffect,useState } from "react";

export default function CurrencyChange(){
   
      const { currency, setCurrency, convertPrice } = useCurrencyStore(); // Access Zustand store
        const basePrice = 20; // Original price in OMR
      
        const [convertedPrice, setConvertedPrice] = useState(convertPrice(basePrice));
      
        // Load saved currency when the component mounts
        useEffect(() => {
          setConvertedPrice(convertPrice(basePrice));
        }, [currency]);
      


    return(
        <View>
                 {/* Currency Picker */}
          <View className="px-3 py-2">
            <Text className="text-black text-lg font-semibold">Select Currency:</Text>
            <Picker
              selectedValue={currency}
              onValueChange={async (newCurrency) => {
                await setCurrency(newCurrency);
                setConvertedPrice(convertPrice(basePrice)); // Update price when currency changes
              }}
            >
              <Picker.Item label="OMR - Omani Rial" value="OMR" />
              <Picker.Item label="USD - US Dollar" value="USD" />
              <Picker.Item label="EUR - Euro" value="EUR" />
              <Picker.Item label="GBP - British Pound" value="GBP" />
            </Picker>
          </View>
        </View>
    )
}