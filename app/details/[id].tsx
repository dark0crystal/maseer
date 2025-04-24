'use client'

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { images } from '../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { LinearGradient } from 'expo-linear-gradient';
import { useReservationStore } from '@/store/reservationStore';
import ReservationForm from './ReservationForm';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import Price from '@/components/shared-components/Price';

interface Post {
  id: string;
  title: string;
  img?: string;
  female_only?: boolean;
  location?: string;
  rating?: number;
  price?: string;
  profiles?: {
    full_name?: string;
  };
  company_name?: string;
  activity_type?: string;
  description?: string;
}

const { width, height } = Dimensions.get('window');

export default function ActivityDetails() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationStep, setReservationStep] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const { t } = useTranslation();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  useEffect(() => {
    if (activity) {
      const price = parseFloat(activity.price || '0');
      useReservationStore.getState().setActivityDetails({
        ...activity,
        price: price
      });
    }
  }, [activity]);

  async function fetchPostDetails() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post details:', error);
        return;
      }

      if (data) {
        setActivity(data as Post);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-lg font-medium text-gray-800 mt-4">{t('common.loading')}</Text>
      </View>
    );
  }

  if (!activity) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <StatusBar barStyle="dark-content" />
        <Ionicons name="alert-circle-outline" size={60} color="#9ca3af" />
        <Text className="text-xl font-medium text-gray-800 mt-4">{t('activity.notFound')}</Text>
        <TouchableOpacity 
          className="mt-6 bg-black px-6 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-medium">{t('activity.goBack')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <StatusBar barStyle="light-content" />
        
        {/* Animated header */}
        <Animated.View 
          style={{ 
            opacity: headerOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
          className="bg-white shadow-sm"
        >
          <SafeAreaView>
            <View className="flex-row items-center justify-between px-4 py-3">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold" numberOfLines={1}>
                {activity.title}
              </Text>
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? '#ef4444' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>

        <Animated.ScrollView
          className="bg-white"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={32}
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={5}
          windowSize={10}
        >
          <Animated.View 
            className="relative h-[450px]"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <Image
              source={activity.img ? { uri: activity.img } : images.kayak}
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              className="absolute inset-0"
            />

            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-12 left-4 bg-white/90 p-2 rounded-full shadow-md"
              style={{ elevation: 5 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className="absolute top-12 right-4 bg-white/90 p-2 rounded-full shadow-md"
              style={{ elevation: 5 }}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#ef4444' : 'black'}
              />
            </TouchableOpacity>
            
            <View className="absolute bottom-6 left-5 right-5">
              <Text className="text-3xl font-bold text-white shadow-lg" style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>
                {activity.title}
              </Text>
              <View className="flex-row items-center mt-2">
                <Ionicons name="location-outline" size={16} color="white" />
                <Text className="text-white ml-1 text-base font-medium">
                  {activity.location || 'Oman'}
                </Text>
              </View>
              <View className="mt-2 bg-black/30 self-start px-3 py-1 rounded-full">
                <StarRatingDisplay rating={activity.rating || 4.5} starSize={18} color="#FFD700" />
              </View>
            </View>
          </Animated.View>

          <Animated.View 
            className="px-5 pt-6"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                  <FontAwesome5 name="user-alt" size={18} color="#3b82f6" />
                </View>
                <View className="ml-3">
                  <Text className="text-xl font-semibold text-gray-900">
                    {activity.profiles?.full_name || activity.company_name || 'Unknown'}
                  </Text>
                  <Text className="text-gray-600">Host</Text>
                </View>
              </View>
             
            </View>

            <View className="mt-6 flex-row justify-between">
              <View className="bg-gray-50 rounded-xl p-4 flex-1 mr-2">
                <View className="flex-row items-center">
                  <MaterialIcons name="category" size={18} color="#3b82f6" />
                  <Text className="text-gray-800 font-medium ml-2">Type</Text>
                </View>
                <Text className="text-gray-600 mt-1">
                  {activity.activity_type || 'Adventure'}
                </Text>
              </View>
              <View className="bg-gray-50 rounded-xl p-4 flex-1 ml-2">
                <View className="flex-row items-center">
                  <MaterialIcons name="attach-money" size={18} color="#3b82f6" />
                  <Text className="text-gray-800 font-medium ml-2">Price</Text>
                </View>
                <Text className="text-gray-600 mt-1">
                  <Price price={activity.price} />
                </Text>
              </View>
            </View>

            <View className="mt-6  pt-6 border-t border-gray-200">
              <Text className="text-xl font-semibold text-gray-900">{t('activity.about')}</Text>
              <Text className="text-gray-700 mt-2 leading-6">
                {activity.description || t('activity.description')}
              </Text>
            </View>
            
            <View className="mt-8 bg-blue-50 p-5 rounded-xl">
              <Text className="text-lg font-semibold text-gray-900">{t('activity.whatToExpect')}</Text>
              <View className="mt-3">
                <View className="flex-row items-center mt-2">
                  <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                    <Ionicons name="time-outline" size={16} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-700 ml-3">{t('activity.flexibleScheduling')}</Text>
                </View>
                <View className="flex-row items-center mt-3">
                  <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                    <Ionicons name="people-outline" size={16} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-700 ml-3">{t('activity.smallGroups')}</Text>
                </View>
                <View className="flex-row items-center mt-3">
                  <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                    <Ionicons name="shield-checkmark-outline" size={16} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-700 ml-3">{t('activity.safetyEquipment')}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4" style={{ paddingBottom: Platform.OS === 'ios' ? 20 : 10 }}>
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-gray-600 text-sm">{t('activity.pricePerPerson')}</Text>
              <Text className="text-2xl font-bold"><Price price={activity.price} /></Text>
            </View>
            
          </View>
          <TouchableOpacity
            className="bg-black px-6 py-4 rounded-xl w-full flex-row justify-center items-center"
            onPress={() => setModalVisible(true)}
            style={{ elevation: 2 }}
          >
            <Text className="text-white font-bold text-lg">{t('activity.reserveNow')}</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={false} visible={modalVisible} animationType="slide">
          <SafeAreaView className="flex-1 bg-white">
            <View className="px-5 py-4 border-b border-gray-200 flex-row items-center">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  useReservationStore.getState().resetReservation();
                }}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-center flex-1">
                {t('activity.makeReservation')}
              </Text>
            </View>
            <ReservationForm />
          </SafeAreaView>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
