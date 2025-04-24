import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router';
import CurrencyChange from '../(user-dashboard)/Currencychange';
import Account from '@/components/auth/Account';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Button, Divider } from '@rneui/themed';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("profile");

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(t('errorSigningOut'), error.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>{t('loading')}</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center p-6">
        <View className="w-full max-w-sm">
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-black mb-2">{t('myProfile')}</Text>
            <Text className="text-gray-500 text-center">{t('loginPrompt')}</Text>
          </View>
          <Account />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white px-4 pt-6 pb-4">
          <View className="flex-row items-center">
            <View className="h-20 w-20 rounded-full bg-gray-200 mr-4 overflow-hidden">
              {/* User avatar placeholder */}
              <View className="h-full w-full bg-gray-300 items-center justify-center">
                <Text className="text-2xl font-bold text-black">
                  {session.user.email?.charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-black">
                {session.user.email?.split('@')[0]}
              </Text>
              <Text className="text-gray-500">{session.user.email}</Text>
              <TouchableOpacity className="mt-1">
                <Text className="text-black font-semibold">{t('editProfile')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider width={1} color="#f2f2f2" />

        {/* Admin Actions */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-black mb-4">{t('adminActions')}</Text>
          <View className="space-y-3">
            <Link href="/(admin)/StepOne" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5 name="plus-circle" size={18} color="black" />
                  <Text className="text-base font-medium text-black">{t('addNewActivity')}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>

            <Link href="/(user-dashboard)/add-place" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5 name="map-marker-alt" size={18} color="black" />
                  <Text className="text-base font-medium text-black">{t('addNewPlace')}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>

            <Link href="/(user-dashboard)/add-rental-product" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5 name="shopping-cart" size={18} color="black" />
                  <Text className="text-base font-medium text-black">{t('addRentalProduct')}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>

            <Link href="/(user-dashboard)/manage-activity" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5 name="tasks" size={18} color="black" />
                  <Text className="text-base font-medium text-black">{t('manageActivities')}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>

            <Link href="/(admin)/" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <MaterialIcons name="dashboard" size={18} color="black" />
                  <Text className="text-base font-medium text-black">{t('adminDashboard')}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <Divider width={1} color="#f2f2f2" />

        {/* Settings Section */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-black mb-4">{t('settings')}</Text>
          <CurrencyChange />
        </View>

        <View className="flex-row justify-center mb-4">
            <LanguageSwitcher />
        </View>
        <Divider width={1} color="#f2f2f2" />

        {/* Account Section */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-black mb-4">{t('myProfile')}</Text>
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4"
            onPress={() => Alert.alert(t('myReservations'), t('myReservations'))}
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="calendar-outline" size={18} color="black" />
              <Text className="text-base font-medium text-black">{t('myReservations')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4"
            onPress={() => Alert.alert(t('myFavorites'), t('myFavorites'))}
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="heart-outline" size={18} color="black" />
              <Text className="text-base font-medium text-black">{t('myFavorites')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6"
            onPress={() => Alert.alert(t('myReviews'), t('myReviews'))}
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="star-outline" size={18} color="black" />
              <Text className="text-base font-medium text-black">{t('myReviews')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          
          <Button 
            title={t('logout')} 
            onPress={handleSignOut} 
            buttonStyle={{ backgroundColor: 'black', borderRadius: 8, padding: 12 }}
            titleStyle={{ fontWeight: '600' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
