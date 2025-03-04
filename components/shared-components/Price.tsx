import {View , Text} from "react-native"
import {useState, useEffect} from "react"
import { useCurrencyStore } from "@/store/useCurrencyStore";

export default function Price({price}:any){
    const { currency, convertPrice } = useCurrencyStore(); // Access Zustand store
    // const basePrice = 20; // Original price in OMR
  
    const [convertedPrice, setConvertedPrice] = useState(convertPrice(price));
  
    // Load saved currency when the component mounts
    useEffect(() => {
      setConvertedPrice(convertPrice(price));
    }, [currency]);
  

    return(
        <View>
            <Text className="text-lg font-bold">
                {convertedPrice} {currency}
            </Text>
        </View>
    )
}