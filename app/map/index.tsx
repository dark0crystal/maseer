import React ,{useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View ,Text} from 'react-native';
import { Link, Stack } from 'expo-router';
import {Marker} from 'react-native-maps';
import CustomMarker from '@/components/map-design/CustomMarker';
import MapOverlay from '@/components/map-design/MapOverlay';


export default function App() {
    const [selectedActivity ,setSelectedActivity ] = useState(null)

    const data = [
        {
          "id":1,
          "latitude": 23.4543,
          "longitude": 58.5453,
          "activityType": "Hiking",
          "price": "Free",
          "title": "Muttrah Mountain Trail",
          "type":"Hard"
        },
        {
          "id":2,
          "latitude": 22.9333,
          "longitude": 57.5333,
          "activityType": "Camping",
          "price": "5 OMR per night",
          "title": "Wadi Bani Khalid Camp",
          "type":"Hard"
        },
        {
          "id":3,
          "latitude": 20.5328,
          "longitude": 56.9417,
          "activityType": "Diving",
          "price": "30 OMR",
          "title": "Dimaniyat Islands Diving",
          "type":"Hard"
        },
        {
          "id":4,
          "latitude": 23.3941,
          "longitude": 55.6669,
          "activityType": "Rock Climbing",
          "price": "15 OMR",
          "title": "Jebel Akhdar Climbing",
          "type":"Hard"
        },
        {
          "id":5,
          "latitude": 17.0197,
          "longitude": 54.0897,
          "activityType": "Beach Relaxation",
          "price": "Free",
          "title": "Mughsail Beach Getaway",
          "type":"Hard"
        },
        {
          "id":6,
          "latitude": 21.3000,
          "longitude": 58.8833,
          "activityType": "Desert Safari",
          "price": "50 OMR",
          "title": "Sharqiya Sands Adventure",
          "type":"Hard"
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
        {data.map((activity,index)=>(
           <CustomMarker activity ={activity} index={index} onPress={()=>setSelectedActivity(activity)}/>

        ))}
      </MapView>
        {selectedActivity &&
             <MapOverlay activity={selectedActivity} />
        }
     
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
