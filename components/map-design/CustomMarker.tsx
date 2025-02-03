
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View ,Text} from 'react-native';
import { Link, Stack } from 'expo-router';
import {Marker} from 'react-native-maps';

export default function CustomMarker({activity ,index ,onPress}:any){
    return(

        <Marker 
            onPress={onPress}
            key={index}
            coordinate={{latitude: activity.latitude , longitude: activity.longitude}}
            >
            {/* <Link href={`/details/${activity.id}`} className='mt-2'> */}
                <View className='bg-white border p-2 rounded-2xl'>
                    <Text className='text-sm font-pmedium'>{activity.activityType}</Text>  
                </View>
            {/* </Link> */}
         
        </Marker>
    )
}