import { Text, View } from "react-native";

export default function MapOverlay(){
    return(
        <View className="absolute w-fit h-[20vh] rounded-3xl bg-white bottom-20 left-10 right-10">
            <Text className="text-black text-2xl">New Activity</Text>
        </View>
    )
}