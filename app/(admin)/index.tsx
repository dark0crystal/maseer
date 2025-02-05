import { useAddNewActivity } from "@/store/FormStore";
import { View ,Text, Button} from "react-native";

export default function Home(){

    const price = useAddNewActivity((state)=>state.price)
    const increase = useAddNewActivity((state)=>state.incresePrice)
    const decrease = useAddNewActivity((state)=>state.decreasePrice)
    return(
        <View>
            <Text>
                {price}
            </Text>
            <Button onPress={increase}>increase</Button>
            <Button onPress={decrease}>decrease</Button>
        </View>
    )
}