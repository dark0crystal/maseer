import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View ,Text} from 'react-native';
import { Link, Stack } from 'expo-router';
import {Marker} from 'react-native-maps';

export default function App() {

    const data = [
        {
          "id":1,
          "latitude": 23.4543,
          "longitude": 58.5453,
          "activityType": "Hiking",
          "price": "Free",
          "title": "Muttrah Mountain Trail"
        },
        {
          "id":2,
          "latitude": 22.9333,
          "longitude": 57.5333,
          "activityType": "Camping",
          "price": "5 OMR per night",
          "title": "Wadi Bani Khalid Camp"
        },
        {
          "id":3,
          "latitude": 20.5328,
          "longitude": 56.9417,
          "activityType": "Diving",
          "price": "30 OMR",
          "title": "Dimaniyat Islands Diving"
        },
        {
          "id":4,
          "latitude": 23.3941,
          "longitude": 55.6669,
          "activityType": "Rock Climbing",
          "price": "15 OMR",
          "title": "Jebel Akhdar Climbing"
        },
        {
          "id":5,
          "latitude": 17.0197,
          "longitude": 54.0897,
          "activityType": "Beach Relaxation",
          "price": "Free",
          "title": "Mughsail Beach Getaway"
        },
        {
          "id":6,
          "latitude": 21.3000,
          "longitude": 58.8833,
          "activityType": "Desert Safari",
          "price": "50 OMR",
          "title": "Sharqiya Sands Adventure"
        }
      ]
      

  return (
    <View style={styles.container}>
        <Stack.Screen options={{headerShown:false}}/> 
      <MapView 
    //    initialRegion={{
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   }}
      style={styles.map}
       >
        {data.map((marker,index)=>(
            <Marker 
            key={index}
            coordinate={{latitude: marker.latitude , longitude: marker.longitude}}
            title={marker.title}
            description={marker.price}>
                <Link href={`/details/${marker.id}`} className='mt-2'>
                    <View className='bg-white border p-2 rounded-2xl'>
                        <Text className='text-sm font-pmedium'>{marker.activityType}</Text>  
                    </View>
                </Link>
             
            </Marker>

        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
