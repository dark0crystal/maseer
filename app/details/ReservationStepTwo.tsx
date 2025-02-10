import { View ,Text, TextInput} from "react-native";


export default function ReservationStepTwo(){
    return(
        <View>
            <Text>
               Guests
            </Text>
            <View>
                <TextInput />
            </View>
            <Text>
               Phone Number
            </Text>
            <View>
                <TextInput />
            </View>
        </View>
    )
}