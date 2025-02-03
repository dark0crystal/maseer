import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import {Marker} from 'react-native-maps';

export default function App() {
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
