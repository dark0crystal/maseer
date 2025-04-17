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

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

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
      Alert.alert('Error signing out', error.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center p-6">
        <View className="w-full max-w-sm">
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome</Text>
            <Text className="text-gray-500 text-center">Log in or sign up to access your profile</Text>
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
                <Text className="text-2xl font-bold text-gray-500">
                  {session.user.email?.charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-800">
                {session.user.email?.split('@')[0]}
              </Text>
              <Text className="text-gray-500">{session.user.email}</Text>
              <TouchableOpacity className="mt-1">
                <Text className="text-pink-500 font-semibold">Edit profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider width={1} color="#f2f2f2" />

        {/* Admin Actions */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Admin Actions</Text>
          <View className="space-y-3">
            <Link href="/(admin)/StepOne" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5 name="plus-circle" size={18} color="#FF5A5F" />
                  <Text className="text-base font-medium text-gray-800">Add New Activity</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>

            <Link href="/(user-dashboard)/manage-activity" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <FontAwesome5 name="tasks" size={18} color="#FF5A5F" />
                  <Text className="text-base font-medium text-gray-800">Manage Activities</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>

            <Link href="/(admin)/" asChild>
              <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                <View className="flex-row items-center space-x-3">
                  <MaterialIcons name="dashboard" size={18} color="#FF5A5F" />
                  <Text className="text-base font-medium text-gray-800">Admin Dashboard</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <Divider width={1} color="#f2f2f2" />

        {/* Settings Section */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Settings</Text>
          <CurrencyChange />
        </View>

        <Divider width={1} color="#f2f2f2" />

        {/* Account Section */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Account</Text>
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4"
            onPress={() => Alert.alert('Account Info', 'Your account details')}
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="person-outline" size={18} color="#FF5A5F" />
              <Text className="text-base font-medium text-gray-800">Personal Information</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6"
            onPress={() => Alert.alert('Security', 'Manage your security settings')}
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="shield-outline" size={18} color="#FF5A5F" />
              <Text className="text-base font-medium text-gray-800">Security</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>
          
          <Button 
            title="Sign Out" 
            onPress={handleSignOut} 
            buttonStyle={{ backgroundColor: '#FF5A5F', borderRadius: 8, padding: 12 }}
            titleStyle={{ fontWeight: '600' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
