import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import {Marker} from 'react-native-maps';

export default function App() {

    const data = [
        {
          "latitude": 23.6143,
          "longitude": 58.5453,
          "activityType": "Hiking",
          "price": "Free",
          "title": "Muttrah Mountain Trail"
        },
        {
          "latitude": 22.9333,
          "longitude": 57.5333,
          "activityType": "Camping",
          "price": "5 OMR per night",
          "title": "Wadi Bani Khalid Camp"
        },
        {
          "latitude": 20.5328,
          "longitude": 56.9417,
          "activityType": "Diving",
          "price": "30 OMR",
          "title": "Dimaniyat Islands Diving"
        },
        {
          "latitude": 23.3941,
          "longitude": 57.6669,
          "activityType": "Rock Climbing",
          "price": "15 OMR",
          "title": "Jebel Akhdar Climbing"
        },
        {
          "latitude": 17.0197,
          "longitude": 54.0897,
          "activityType": "Beach Relaxation",
          "price": "Free",
          "title": "Mughsail Beach Getaway"
        },
        {
          "latitude": 23.3000,
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
       initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map} >
         <Marker
            coordinate={{latitude:37.78825 , longitude:-122.4324}}
            title="Helllo there"
            description="let's goooo"
        />
        <Marker
            coordinate={{latitude:35.78825 , longitude:-122.4324}}
            title="Helllo there"
            description="let's goooo"
        />
        <Marker
            coordinate={{latitude:37.78825 , longitude:-112.4324}}
            title="Helllo there"
            description="let's goooo"
        />
        <Marker
            coordinate={{latitude:37.78825 , longitude:-127.4324}}
            title="Helllo there"
            description="let's goooo"
        />
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
