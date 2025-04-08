import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

interface ReservationStepTwoProps {
  onContinue: () => void; // 👈 add this prop
}

export default function ReservationStepTwo({ onContinue }: ReservationStepTwoProps) {
  const phoneInput = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [guestCount, setGuestCount] = useState('');

  const handleContinue = () => {
    const valid = phoneInput.current?.isValidNumber(phoneNumber);
    setIsValid(!!valid);

    if (!valid) {
      Alert.alert('Invalid phone number', 'Please enter a valid number.');
      return;
    }

    if (!guestCount) {
      Alert.alert('Guests Required', 'Please enter the number of guests.');
      return;
    }

    // 🎯 Trigger next step
    onContinue();
  };

  return (
    <View className="flex-1 bg-white p-4 space-y-6">
      <View>
        <Text className="text-lg font-semibold text-gray-800 mb-2">Guests</Text>
        <TextInput
          placeholder="Number of guests"
          keyboardType="numeric"
          className="border border-gray-300 rounded-lg p-3 text-base"
          value={guestCount}
          onChangeText={setGuestCount}
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
        />

        {!isValid && (
          <Text className="text-red-600 mt-1 text-sm">
            Please enter a valid phone number
          </Text>
        )}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleContinue}
        className="mt-6 bg-blue-600 rounded-xl py-3 px-6 self-start"
      >
        <Text className="text-white font-semibold text-base">Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}
