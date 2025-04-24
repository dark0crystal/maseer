import {View , Text} from "react-native"
import {useState, useEffect} from "react"
import { useCurrencyStore } from "@/store/useCurrencyStore";

interface PriceProps {
  price: number;
  textStyle?: string; // Optional custom text style using nativewind
  containerStyle?: string; // Optional custom container style using nativewind
}

export default function Price({ price, textStyle = "text-lg font-bold", containerStyle = "" }: PriceProps) {
    const { currency, convertPrice } = useCurrencyStore(); // Access Zustand store
    // const basePrice = 20; // Original price in OMR
  
    const [convertedPrice, setConvertedPrice] = useState(convertPrice(price));
  
    // Load saved currency when the component mounts
    useEffect(() => {
      setConvertedPrice(convertPrice(price));
    }, [currency]);
  

    return(
        <View className={containerStyle}>
            <Text className={textStyle}>
                {convertedPrice} {currency}
            </Text>
        </View>
    )
}