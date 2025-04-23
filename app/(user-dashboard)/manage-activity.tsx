import { View, Text, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { StarRatingDisplay} from 'react-native-star-rating-widget';
import { useState } from "react";
import ManageBooking from "./ManageBooking";

export default function ManageActivity() {
//   const navigation = useNavigation();
 const [modalVisible, setModalVisible] = useState(false);

  const activityCategories = [
    { id: "1", location: "Muscat", title: "Scuba Diving", type: "Hard", female: true, price: "10.0", companyName: "MfqodLTD", img: images.kayak },
    { id: "2", location: "Bidyah", title: "Fishing", type: "Easy", female: true, price: "120", companyName: "Masser", img: images.brand },
    { id: "3", location: "Sidab", title: "Sea tour", type: "Mid", female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
    { id: "4", location: "Qatar", title: "Snorkeling", type: "Hard", female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
    { id: "5", location: "Saudi", title: "Jet ski", type: "Easy", female: true, price: "30000", companyName: "Oman trips LTD", img: images.kayak },
    { id: "6", location: "Dubai", title: "Kayak", type: "Mid", female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4 text-gray-800">Manage Activities</Text>

      <FlatList
                data={activityCategories}
                keyExtractor={(category) => category.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, marginTop:20  ,alignItems: "center",}}
                renderItem={({ item }) => (
                
                <View className="bg-white shadow w-[350px] h-[190px] p-2 m-2 rounded-3xl border border-gray-300 flex flex-row overflow-hidden gap-1">
                    {/* image section */}
                   <View className="relative w-[120px] h-[160px] overflow-hidden rounded-2xl">
                        <Image className="absolute w-full h-full" resizeMode="cover" source={item.img} />   
                    </View>

                    {/* content section */}
                    <View className='bg-white w-[200px] h-[160px] p-2 overflow-hidden rounded-2xl flex flex-row'>

                        
                        {/* Left section */}
                        <View>

                            {/* this button should not be shown if no bookings */}
                            <TouchableOpacity className="bg-black px-6 py-3 rounded-lg" onPress={() => setModalVisible(true)}>
                                <Text className="text-white font-semibold">show user details</Text>
                            </TouchableOpacity>

                            <Text className="text-base font-psemibold text-gray-600">{item.title}</Text>
                            <Text className="text-base text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{item.location}</Text>
                            <View className=''>
                                <StarRatingDisplay
                                    rating={2.5}
                                    starSize={18}
                                />
                            </View>
                            <Text className="text-base font-pmedium text-gray-600 mt-1">{item.price}R.O</Text>
                            <View className='flex flex-row items-center gap-1'>
                                <View className='relative flex flex-row items-center justify-center'>
                                    <View className='absolute h-4 w-4 bg-gray-300 rounded-full'/>
                                    <View className='absolute h-3 w-3 bg-gray-400 rounded-full'/>
                                    <View className='h-2 w-2 bg-gray-500 rounded-full'/>
                                    
                                </View>
                                <Text className="text-sm text-gray-600"> {item.type}</Text>
                                
                             </View>
                        </View>
                    </View>
                </View>
              
                )}
            />

           {/* Rendering Reservation components in a Model */}
        <Modal transparent={true} visible={modalVisible} animationType="slide" >
          <View className="flex-1 rounded-t-3xl overflow-hidden">
            <View className="w-full bg-white rounded-lg h-full p-4">
              <View className="flex relative items-center justify-center h-[8vh] mt-14 border-gray-200 border-b-[1px]">
                <TouchableOpacity className="absolute right-4" onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={32} color="black" />
                </TouchableOpacity>

                <Text className="text-lg font-pmedium text-gray-900">Manage Booking</Text>

              </View>
                <ManageBooking/>
              
            </View>
          </View>
        </Modal>
    </View>
  );
}
