import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
export default function ActivityCards(){


    const activityCategories = [
        { id: '1', name: 'Scuba diving', type:"Hard" , female:false ,price:"100.0",companyName:"MfqodLTD" },
        { id: '2', name: 'Fishing' , type:"Easy" , female:true ,price:"1200",companyName:"Masser"},
        { id: '3', name: 'Sea tour' , type:"Mid" , female:false ,price:"20",companyName:"Masser Almotahidah"},
        { id: '4', name: 'Snorkeling' , type:"Hard" , female:false,price:"30.5",companyName:"Masseeer trips" },
        { id: '5', name: 'Jet ski' , type:"Easy" , female:true ,price:"30000",companyName:"Oman trips LTD shshssshs"},
        { id: '6', name: 'Kayak' , type:"Mid" , female:false ,price:"49.5",companyName:"MfqodLTD"},
    ];

    return(
        <View>
            <Text className='text-xl font-psemibold'>Activity Cards</Text>
             <FlatList
                data={activityCategories}
                keyExtractor={(category) => category.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10  ,alignItems: "center",}}
                renderItem={({ item }) => (
                <View className="bg-black-200/30 w-[330px] h-[350px] p-4 m-2 rounded-3xl items-center border border-red-300">
                    <View className='relative w-full h-[300px] overflow-hidden rounded-3xl'>
                        <Image className='absolute w-full h-full' resizeMode="contain" source={images.brand}/>
                    </View>
                    <Text className="text-lg font-semibold text-gray-800">{item.id}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{item.name}</Text>
                   
                </View>
                )}
            />
        </View>
    )
}