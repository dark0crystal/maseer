import {View , Text} from "react-native"
import {Slot} from "expo-router"
import React from "react"
import 'react-native-reanimated';



export default function RootLayout(){
    return(
        <View>
            <Text className="text-5xl">welcome</Text>
            <Slot/>
        </View>
    )
}