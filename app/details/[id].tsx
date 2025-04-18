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
} from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { images } from '../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReservationMain from './ReservationMain';
import ReservationStepOne from './ReservationStepOne';
import ReservationStepTwo from './ReservationStepTwo';
import ReservationStepThree from './ReservationStepThree';
import { supabase } from '../../lib/supabase';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { LinearGradient } from 'expo-linear-gradient';
import { useReservationStore } from '@/store/reservationStore';

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

export default function ActivityDetails() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationStep, setReservationStep] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  useEffect(() => {
    if (activity) {
      useReservationStore.getState().setActivityDetails(activity);
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

  const renderReservationStep = () => {
    switch (reservationStep) {
      case 0:
        return <ReservationStepOne />;
      case 1:
        return <ReservationStepTwo />;
      case 2:
        return <ReservationMain />;
      case 3:
        return <ReservationStepThree />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text className="text-lg font-medium text-gray-800 mt-4">Loading activity details...</Text>
      </View>
    );
  }

  if (!activity) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-medium text-gray-800">Activity not found</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <ScrollView
          className="bg-white"
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="relative h-[400px]">
            <Image
              source={activity.img ? { uri: activity.img } : images.kayak}
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
              className="absolute inset-0"
            />

            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-12 left-4 bg-white/80 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className="absolute top-12 right-4 bg-white/80 p-2 rounded-full"
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </View>

          <View className="px-5 pt-6">
            <Text className="text-3xl font-bold text-gray-900">{activity.title}</Text>

            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={16} color="#333" />
              <Text className="text-gray-600 ml-1 text-base">{activity.location || 'Oman'}</Text>
            </View>

            <View className="mt-3">
              <StarRatingDisplay rating={activity.rating || 4.5} starSize={20} color="#000" />
            </View>

            <View className="mt-6 pt-6 border-t border-gray-200">
              <Text className="text-xl font-semibold text-gray-900">
                Hosted by {activity.profiles?.full_name || activity.company_name || 'Unknown'}
              </Text>
              <Text className="text-gray-600 mt-1">
                Activity type: {activity.activity_type || 'Medium'}
              </Text>
            </View>

            <View className="mt-6 pt-6 border-t border-gray-200">
              <Text className="text-xl font-semibold text-gray-900">About this activity</Text>
              <Text className="text-gray-700 mt-2 leading-6">
                {activity.description || 'No description available for this activity.'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 flex-row items-center justify-between">
          <View>
            <Text className="text-gray-600 text-sm">Price</Text>
            <Text className="text-xl font-bold">{activity.price} OMR</Text>
          </View>
          <TouchableOpacity
            className="bg-black px-6 py-3 rounded-lg"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white font-medium">Reserve</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={false} visible={modalVisible} animationType="slide">
          <SafeAreaView className="flex-1 bg-white">
            <View className="px-5 py-4 border-b border-gray-200 flex-row items-center">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setReservationStep(0);
                  useReservationStore.getState().resetReservation();
                }}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-lg font-medium text-center flex-1">
                {reservationStep === 0
                  ? 'Select Dates'
                  : reservationStep === 1
                  ? 'Choose Guests'
                  : reservationStep === 2
                  ? 'Reservation Summary'
                  : 'Done'}
              </Text>
            </View>

            <View className="flex-1">{renderReservationStep()}</View>

            <View className="border-t border-gray-200 px-5 py-4 flex-row justify-between">
              {reservationStep > 0 && (
                <TouchableOpacity
                  className="px-6 py-3 border border-gray-300 rounded-lg"
                  onPress={() => setReservationStep((prev) => prev - 1)}
                >
                  <Text className="text-black font-medium">Back</Text>
                </TouchableOpacity>
              )}

              {reservationStep < 2 && (
                <TouchableOpacity
                  className="bg-black px-6 py-3 rounded-lg"
                  onPress={() => setReservationStep((prev) => prev + 1)}
                >
                  <Text className="text-white font-medium">Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
