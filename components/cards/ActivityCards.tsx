import { View, Text, FlatList, Image } from 'react-native';
import { images } from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { useTranslation } from 'react-i18next';

export default function ActivityCards() {
  const { t } = useTranslation("activities");

  const activityCategories = [
    { id: '1', location: t('muscat', 'Muscat'), title: t('scubaDiving', 'Scuba diving'), type: t('hard', 'Hard'), female: true, price: "100.0", companyName: "MfqodLTD", img: images.kayak },
    { id: '2', location: t('bidyah', 'Bidyah'), title: t('fishing', 'Fishing'), type: t('easy', 'Easy'), female: true, price: "1200", companyName: "Masser", img: images.brand },
    { id: '3', location: t('sidab', 'Sidab'), title: t('seaTour', 'Sea tour'), type: t('mid', 'Mid'), female: false, price: "20", companyName: "Masser Almotahidah", img: images.kayak },
    { id: '4', location: t('qatar', 'Qatar'), title: t('snorkeling', 'Snorkeling'), type: t('hard', 'Hard'), female: false, price: "30.5", companyName: "Masseeer trips", img: images.brand },
    { id: '5', location: t('saudi', 'Saudi'), title: t('jetSki', 'Jet ski'), type: t('easy', 'Easy'), female: true, price: "30000", companyName: "Oman trips LTD shshssshs", img: images.kayak },
    { id: '6', location: t('dubai', 'Dubai'), title: t('kayak', 'Kayak'), type: t('mid', 'Mid'), female: false, price: "49.5", companyName: "MfqodLTD", img: images.brand },
  ];

  return (
    <View>
      <Text className='text-xl font-psemibold'>{t('activityCards', 'Activity Cards')}</Text>
      <FlatList
        data={activityCategories}
        keyExtractor={(category) => category.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20, alignItems: "center", }}
        renderItem={({ item }) => (
          // <Link href={`/details/${item.id}`} className='mt-2'>
          <Link href="/map" className='mt-2'>
            <View className="bg-white shadow w-[330px] h-[370px] p-3 m-2 rounded-3xl items-center border border-red-300 flex flex-col overflow-hidden">
              <View className="relative w-full h-[230px] overflow-hidden rounded-2xl ">
                <Image className="absolute w-full h-full" resizeMode="cover" source={item.img} />

                {/*Top image text */}
                <View className="absolute top-0 w-full flex justify-center items-center">
                  <View className='bg-white/90 py-[4px] px-10 rounded-b-2xl'>
                    <Text className="text-black text-base font-psemibold text-center font-semibold">{t('topRated', 'Top Rated')}</Text>
                  </View>
                </View>
                {item.female &&
                  <View className="absolute bottom-0 w-full flex justify-center items-center">
                    <View className='bg-white/90 py-[4px] px-10 rounded-t-2xl'>
                      <Text className="text-black text-base font-psemibold text-center font-semibold">{t('female', 'Female')}</Text>
                    </View>
                  </View>
                }
              </View>

              {/* Title */}
              <View className=' w-full rounded-lg px-3 py-1 mt-1'>
                <Text className="text-base font-psemibold text-gray-600 ">{item.title}</Text>
              </View>
              {/* content section */}
              <View className='bg-white w-full  p-3 mt-1 overflow-hidden rounded-2xl border flex flex-row items-center '>

                {/* Left section */}
                <View>
                  <Text className="text-sm text-gray-600 mt-1"><Ionicons name="location-outline" size={13} color="black" />{item.location}</Text>{t('location', 'location')}
                  <Text className="text-sm font-pmedium text-gray-600 mt-1">{item.price} <Text>{t('currency', 'R.O')}</Text></Text>
                </View>
                {/* Right section */}
                <View className=' h-full p-2 mx-2 '>
                  <View className='flex flex-row items-center  absolute bottom-2 left-2 gap-1'>
                    <View className='relative flex flex-row items-center justify-center'>
                      <View className='absolute h-4 w-4 bg-green-300 rounded-full' />
                      <View className='absolute h-3 w-3 bg-green-400 rounded-full' />
                      <View className='h-2 w-2 bg-green-500 rounded-full' />
                    </View>
                    <Text className="text-sm text-gray-600"> {item.type}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
        )}
      />
    </View>
  )
}