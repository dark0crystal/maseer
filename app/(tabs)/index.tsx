import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const activityCategories= [{id:"1" , name:"Scuba diving", icon:""} ,{id:"2", name:"Fishing", icon:""},{id:"3" , name:"Sea tour", icon:""} ,{id:"4" , name:"snorking", icon:""}, {id:"5" , name:"Jet ski", icon:""} ,{id:"6" , name:"Kayak", icon:""},]

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <FlatList 
      data={activityCategories}
      keyExtractor={(category)=>category.id}
      renderItem={({item})=>(
        <View>
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
        </View>
      )}
      />
    </SafeAreaView>
  )
}

export default Home