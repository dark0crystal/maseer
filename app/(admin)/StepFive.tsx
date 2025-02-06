import { View, Text, TextInput, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepFour(){
    return(
        <View>
            <Text className="text-xl font-pmedium text-black mt-4">Now, Select Your Price</Text>
            <Text className="text-base text-gray-500 mt-1">You can change it any time.</Text>
            <TextInput/>
        </View>
    )
}