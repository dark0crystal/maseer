import {View , Text} from "react-native"
import {Slot} from "expo-router"
import React from "react"
import 'react-native-reanimated';
import "./global.css";


export default function RootLayout(){
    return(
        <>
            <Text >Header</Text>
            <Slot/>
            <Text className="text-5xl text-red-600">footer</Text>
        </>
    )
}