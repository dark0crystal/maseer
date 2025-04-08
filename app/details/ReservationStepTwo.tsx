import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

export default function ReservationStepTwo() {
  const phoneInput = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validatePhoneNumber = () => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
    setIsValid(!!checkValid);

    if (!checkValid) {
      Alert.alert('Invalid phone number', 'Please enter a valid number.');
    }
  };

  return (
    <View className="flex-1 bg-white p-4 space-y-6">
      <View>
        <Text className="text-lg font-semibold text-gray-800 mb-2">Guests</Text>
        <TextInput
          placeholder="Number of guests"
          keyboardType="numeric"
          className="border border-gray-300 rounded-lg p-3 text-base"
        />
      </View>

      <View>
        <Text className="text-lg font-semibold text-gray-800 mb-2">Phone Number</Text>

        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="US"
          layout="first"
          onChangeFormattedText={(text) => setPhoneNumber(text)}
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isValid ? '#d1d5db' : 'red',
            padding: 5,
          }}
          textContainerStyle={{
            backgroundColor: 'white',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          textInputStyle={{
            fontSize: 16,
            color: '#111827',
          }}
          countryPickerButtonStyle={{
            marginRight: 10,
          }}
          onEndEditing={validatePhoneNumber}
        />

        {!isValid && (
          <Text className="text-red-600 mt-1 text-sm">
            Please enter a valid phone number
          </Text>
        )}
      </View>
    </View>
  );
}
