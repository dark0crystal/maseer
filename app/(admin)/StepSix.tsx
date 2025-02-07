import { View ,Keyboard, TouchableWithoutFeedback} from "react-native";

export default function StepSix(){
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            Step Six
        </View>
        </TouchableWithoutFeedback>
    )
}