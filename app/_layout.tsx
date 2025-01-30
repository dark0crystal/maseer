import {View , Text} from "react-native"
import {Slot} from "expo-router"
import React from "react"
import 'react-native-reanimated';
import "./global.css";


export default function RootLayout(){
    return(
        <>
            <Text className="text-green-500" >Hea435154der</Text>
            <Text >Header</Text>
            <Text className="text-violet-600 text-5xl">Header</Text>
            <Slot/>
            <Text className="text-5xl text-red-600">footer</Text>
        </>
    )
}