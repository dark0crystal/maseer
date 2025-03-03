import { View ,Text } from "react-native";
import { useFormStore } from "../../store/FormStore";



export default function StepEight(){
    const { title, features, coverImage, images, price,description ,coordinates,availableSeats, genderPreference,activityDates} = useFormStore();

    console.log("in eight")
    console.log({ title, description ,features, coverImage, images,price , coordinates,availableSeats, genderPreference,activityDates});



    return(
        <View>
            <Text>
                Step Eight
            </Text>
        </View>
    )
}