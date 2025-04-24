import React, { useState } from 'react'
import { Alert, View, Text, TouchableOpacity, Linking, ImageBackground } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('auth')

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert(t('checkInbox', 'Please check your inbox for email verification!'))
    setLoading(false)
  }

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://www.example.com/privacy-policy')
  }

  const handleTermsOfService = () => {
    Linking.openURL('https://www.example.com/terms-of-service')
  }

  return (
    <View className="p-4 rounded-xl bg-white shadow-lg">
      <View className="items-center mb-6">
        
      </View>
      
      <View className="mb-5">
        <Input
          label={t('email', 'Email')}
          labelStyle={{ color: '#5B5B5B', fontWeight: '600', marginBottom: 8 }}
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#333333', size: 18 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder={t('emailPlaceholder', 'your.email@example.com')}
          autoCapitalize={'none'}
          inputContainerStyle={{ 
            borderWidth: 0,
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 5,
            height: 55
          }}
          inputStyle={{ color: '#333', paddingLeft: 10 }}
          containerStyle={{ paddingHorizontal: 0 }}
        />
      </View>
      
      <View className="mb-6">
        <Input
          label={t('password', 'Password')}
          labelStyle={{ color: '#5B5B5B', fontWeight: '600', marginBottom: 8 }}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#333333', size: 22 }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={t('passwordPlaceholder', 'Your secure password')}
          autoCapitalize={'none'}
          inputContainerStyle={{ 
            borderWidth: 0,
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 5,
            height: 55
          }}
          inputStyle={{ color: '#333', paddingLeft: 10 }}
          containerStyle={{ paddingHorizontal: 0 }}
        />
      </View>
      
      <View className="mb-4">
        <Button 
          title={t('signIn', 'Sign in')} 
          disabled={loading} 
          onPress={() => signInWithEmail()} 
          buttonStyle={{ 
            backgroundColor: '#333333', 
            padding: 15, 
            borderRadius: 12,
            height: 55
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
          disabledStyle={{ backgroundColor: '#CCCCCC' }}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#333333', '#000000'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 }
          }}
        />
      </View>
      
      <View className="mb-6">
        <Button 
          title={t('createAccount', 'Create Account')} 
          disabled={loading} 
          onPress={() => signUpWithEmail()} 
          buttonStyle={{ 
            backgroundColor: 'transparent', 
            padding: 15, 
            borderRadius: 12,
            borderWidth: 1.5, 
            borderColor: '#333333',
            height: 55
          }}
          titleStyle={{ color: '#333333', fontWeight: 'bold', fontSize: 16 }}
          disabledStyle={{ backgroundColor: 'transparent', borderColor: '#CCCCCC' }}
          disabledTitleStyle={{ color: '#CCCCCC' }}
        />
      </View>
      
      <View className="flex-row flex-wrap justify-center items-center mt-4 px-2">
        <Text className="text-gray-500 text-center text-sm">{t('byContinuing', 'By continuing, you agree to our')} </Text>
        <TouchableOpacity onPress={handleTermsOfService}>
          <Text className="text-gray-800 font-bold text-sm">{t('termsOfService', 'Terms of Service')}</Text>
        </TouchableOpacity>
        <Text className="text-gray-500 text-sm"> {t('and', 'and')} </Text>
        <TouchableOpacity onPress={handlePrivacyPolicy}>
          <Text className="text-gray-800 font-bold text-sm">{t('privacyPolicy', 'Privacy Policy')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
