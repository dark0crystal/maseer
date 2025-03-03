import { View, Text, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../store/FormStore";
import { formSchema } from "../../schemas/formSchema";
import ProgressBar from "@/components/shared-components/ProgressBar";
import { useRouter } from "expo-router";


export default function StepEight(){
    const { title, features, coverImage, images, price,description ,coordinates,availableSeats, genderPreference,activityDates,incrementFormprogress,decrementFormprogress} = useFormStore();
    const router = useRouter();
    console.log("in eight")
    console.log({ title, description ,features, coverImage, images,price , coordinates,availableSeats, genderPreference,activityDates});

    const onNext = () => {
        console.log({ title, features, coverImage, images });
        router.replace("./StepFive");
        incrementFormprogress();
      };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 100 }}>
            
  
            
  
           
            
          </ScrollView>
  
         {/* Fixed Bottom Buttons */}
        <View className="absolute bottom-0 bg-white h-[120px] flex flex-row w-screen">
         {/* progress bar */}
          <ProgressBar />
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {router.back() , decrementFormprogress()}}
            className="absolute bottom-12 left-6 rounded-lg px-6 py-3"
          >
            <Text className="text-black text-lg font-semibold">Back</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleSubmit(onNext)}
            className= "absolute bottom-12 right-6 bg-black rounded-lg px-6 py-3"
          >
            <Text className="text-white text-lg font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    )
}