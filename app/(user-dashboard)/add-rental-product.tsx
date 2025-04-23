import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

interface Governorate {
  id: number
  name: string
}

interface Property {
  name: string
  value: string
}

interface ProductType {
  id: number
  name: string
}

const governorates: Governorate[] = [
  { id: 1, name: 'Muscat' },
  { id: 2, name: 'Dhofar' },
  { id: 3, name: 'Musandam' },
  { id: 4, name: 'Al Batinah' },
  { id: 5, name: 'Al Dakhiliyah' },
  { id: 6, name: 'Al Sharqiyah' },
  { id: 7, name: 'Al Wusta' },
  { id: 8, name: 'Al Dhahirah' },
]

const productTypes: ProductType[] = [
  { id: 1, name: 'Tent' },
  { id: 2, name: 'Caravan' },
]

export default function AddRentalProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    governorate: 1,
    city: '',
    type: 1, // Default to Tent
  })

  const addProperty = () => {
    setProperties([...properties, { name: '', value: '' }])
  }

  const updateProperty = (index: number, field: 'name' | 'value', text: string) => {
    const newProperties = [...properties]
    newProperties[index][field] = text
    setProperties(newProperties)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    try {
      setLoading(true)

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw new Error(userError.message)
      if (!user) throw new Error('User not authenticated')

      // Insert product
      const { data: product, error: productError } = await supabase
        .from('rental_products')
        .insert([{
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          location: formData.location,
          governorate: formData.governorate,
          city: formData.city,
          type: formData.type, // Add the type field
          is_available: true
        }])
        .select()
        .single()

      if (productError) throw productError
      if (!product) throw new Error('Failed to create product')

      // Insert properties if there are any
      if (properties.length > 0) {
        const propertiesToInsert = properties
          .filter(prop => prop.name.trim() !== '' && prop.value.trim() !== '')
          .map(prop => ({
            product_id: product.id,
            name: prop.name,
            value: prop.value
          }))

        if (propertiesToInsert.length > 0) {
          const { error: propertiesError } = await supabase
            .from('product_properties')
            .insert(propertiesToInsert)

          if (propertiesError) throw propertiesError
        }
      }

      Alert.alert('Success', 'Product added successfully')
      router.back()
    } catch (error: any) {
      console.error("Submission error:", error)
      Alert.alert('Error', error.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-2xl font-bold mb-6">Add New Rental Product</Text>

          {/* Title */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Title</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Enter product title"
            />
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 h-24"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter product description"
              multiline
            />
          </View>

          {/* Product Type */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Product Type</Text>
            <View className="border border-gray-300 rounded-lg">
              <Picker
                selectedValue={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                {productTypes.map((type) => (
                  <Picker.Item key={type.id} label={type.name} value={type.id} color='black'/>
                ))}
              </Picker>
            </View>
          </View>

          {/* Price */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Price (OMR)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              placeholder="Enter price"
              keyboardType="numeric"
            />
          </View>

          {/* Location */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Location</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
              placeholder="Enter location"
            />
          </View>

          {/* Governorate */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Governorate</Text>
            <View className="border border-gray-300 rounded-lg">
              <Picker
                selectedValue={formData.governorate}
                onValueChange={(value) => setFormData({ ...formData, governorate: value })}
              >
                {governorates.map((gov) => (
                  <Picker.Item key={gov.id} label={gov.name} value={gov.id} color='black'/>
                ))}
              </Picker>
            </View>
          </View>

          {/* City */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">City</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
              placeholder="Enter city"
            />
          </View>

          {/* Properties */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700">Properties</Text>
              <TouchableOpacity
                className="bg-blue-500 rounded-full p-2"
                onPress={addProperty}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
            {properties.map((prop, index) => (
              <View key={index} className="flex-row space-x-2 mb-2">
                <TextInput
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                  value={prop.name}
                  onChangeText={(text) => updateProperty(index, 'name', text)}
                  placeholder="Property name"
                />
                <TextInput
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                  value={prop.value}
                  onChangeText={(text) => updateProperty(index, 'value', text)}
                  placeholder="Property value"
                />
                <TouchableOpacity
                  className="bg-red-500 rounded-lg p-3"
                  onPress={() => setProperties(properties.filter((_, i) => i !== index))}
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-lg p-4 mb-8"
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-white text-center font-bold">
              {loading ? 'Adding...' : 'Add Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
