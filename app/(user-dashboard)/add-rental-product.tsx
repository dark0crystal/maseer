import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

interface Governorate {
  id: number
  name: string
}

interface Property {
  name: string
  value: string
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

export default function AddRentalProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    governorate: 1,
    city: '',
  })

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const selectedUris = result.assets.map(asset => asset.uri);
        setImages(prev => [...prev, ...selectedUris]);
      }
    } catch (error) {
      console.error("Error picking images:", error);
      Alert.alert("Error", "Failed to pick images. Please try again.");
    }
  };

  const addProperty = () => {
    setProperties([...properties, { name: '', value: '' }])
  }

  const updateProperty = (index: number, field: 'name' | 'value', text: string) => {
    const newProperties = [...properties]
    newProperties[index][field] = text
    setProperties(newProperties)
  }

  const optimizeImage = async (uri: string): Promise<string> => {
    try {
      // Optimize the image by resizing and compressing it
      const optimizedImage = await manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }], // Resize to max width of 1200px (maintains aspect ratio)
        { compress: 0.7, format: SaveFormat.JPEG } // 70% quality JPEG
      );
      
      return optimizedImage.uri;
    } catch (error) {
      console.error("Image optimization failed:", error);
      // Return original URI if optimization fails
      return uri;
    }
  };

  const uploadImages = async (userId: string) => {
    const uploadedUrls: string[] = []
  
    for (const image of images) {
      try {
        // Optimize the image before uploading
        const optimizedImageUri = await optimizeImage(image);
        
        // Generate a unique filename
        const fileExt = optimizedImageUri.split('.').pop() || 'jpg';
        const fileName = `${userId}_${Date.now()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;
        
        // Read the file from the filesystem
        const fileInfo = await FileSystem.getInfoAsync(optimizedImageUri);
        if (!fileInfo.exists) {
          console.log(`File doesn't exist: ${optimizedImageUri}`);
          continue;
        }
        
        // Convert to base64 and upload directly
        const base64 = await FileSystem.readAsStringAsync(optimizedImageUri, { 
          encoding: FileSystem.EncodingType.Base64 
        });
        
        // Upload to Supabase
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("rental-images")
          .upload(filePath, base64, {
            contentType: `image/${fileExt}`,
            cacheControl: "3600",
            upsert: false,
          });
  
        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }
  
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("rental-images")
          .getPublicUrl(filePath);
  
        uploadedUrls.push(publicUrlData.publicUrl);
        
        // Clean up temporary optimized image if different from original
        if (optimizedImageUri !== image && optimizedImageUri.startsWith('file://')) {
          await FileSystem.deleteAsync(optimizedImageUri, { idempotent: true });
        }
      } catch (err) {
        console.error("Image processing/upload failed:", err);
        Alert.alert("Upload Failed", "Could not upload one of the images.");
      }
    }
  
    return uploadedUrls;
  };

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

      // Upload images
      const uploadedImageUrls = await uploadImages(user.id)

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
          is_available: true
        }])
        .select()
        .single()

      if (productError) throw productError
      if (!product) throw new Error('Failed to create product')

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
                  <Picker.Item key={gov.id} label={gov.name} value={gov.id} />
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

          {/* Images */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Images</Text>
            <ScrollView horizontal className="flex-row space-x-2">
              {images.map((uri, index) => (
                <View key={index} className="relative">
                  <Image source={{ uri }} className="w-32 h-32 rounded-lg" />
                  <TouchableOpacity
                    className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                    onPress={() => setImages(images.filter((_, i) => i !== index))}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center"
                onPress={pickImages}
              >
                <Ionicons name="add" size={32} color="gray" />
              </TouchableOpacity>
            </ScrollView>
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
