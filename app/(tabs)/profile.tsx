import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import CurrencyChange from '../(user-dashboard)/Currencychange';
import Account from '@/components/auth/Account';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Button } from '@rneui/themed';

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error signing out', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <Text className="text-3xl font-bold text-gray-800 mb-4">👤 Profile</Text>

        {/* Action Cards */}
        <View className="space-y-4">

          <Link href="/(admin)/StepOne" asChild>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
              <View className="flex-row items-center space-x-3">
                <FontAwesome5 name="plus-circle" size={20} color="#2563eb" />
                <Text className="text-lg text-gray-800">Add New Activity</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </Link>

          <Link href="/(user-dashboard)/manage-activity" asChild>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
              <View className="flex-row items-center space-x-3">
                <FontAwesome5 name="tasks" size={20} color="#2563eb" />
                <Text className="text-lg text-gray-800">Manage Activities</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </Link>

          <Link href="/(admin)/" asChild>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
              <View className="flex-row items-center space-x-3">
                <MaterialIcons name="dashboard" size={20} color="#2563eb" />
                <Text className="text-lg text-gray-800">Admin Dashboard</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </Link>

        </View>

        {/* Settings Section */}
        <View className="mt-10">
          <Text className="text-xl font-semibold text-gray-800 mb-2">Settings</Text>
          <CurrencyChange />
        </View>

        {/* Account Section */}
        <View className="mt-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">Account</Text>
          {session && session.user ? (
            <View className="bg-gray-100 p-4 rounded-xl">
              <Text className="text-gray-800 mb-2">Logged in as: {session.user.email}</Text>
              <Button 
                title="Sign Out" 
                onPress={handleSignOut} 
                buttonStyle={{ backgroundColor: '#ef4444' }}
              />
            </View>
          ) : (
            <Account />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};    

export default Profile;
