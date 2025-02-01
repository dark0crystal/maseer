import { View, Text, FlatList, Image } from 'react-native';
import {images} from "../../constants"
export default function ActivityCards(){


    const activityCategories = [
        { id: '1', name: 'Scuba diving' },
        { id: '2', name: 'Fishing' },
        { id: '3', name: 'Sea tour' },
        { id: '4', name: 'Snorkeling' },
        { id: '5', name: 'Jet ski' },
        { id: '6', name: 'Kayak' },
    ];

    return(
        <View>
            <Text className='text-xl font-psemibold'>Activity Cards</Text>
             <FlatList
                data={activityCategories}
                keyExtractor={(category) => category.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                <View className="bg-white w-full h-[250px] p-2 m-2 rounded-lg items-center border border-red-300">
                    <View className='relative w-[270px] h-[300px]'>
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