import {View , Text} from "react-native"
import {Slot} from "expo-router"
import React from "react"
// Import your global CSS file
import "../global.css";


export default function RootLayout(){
    return(
        <>
            <Text>Header</Text>
            <Slot/>
            <Text>footer</Text>
        </>
    )
}