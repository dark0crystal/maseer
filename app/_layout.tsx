import {View , Text} from "react-native"
import {Slot} from "expo-router"
import React from "react"
import "./global.css";

export default function RootLayout(){
    return(
        <>
            <Text>Header</Text>
            <Slot/>
            <Text>footer</Text>
        </>
    )
}