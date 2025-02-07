
import { View, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import { useFormStore } from "../../store/FormStore";
import { useRouter } from "expo-router";

export default function StepTwo(){
  return(
    <View>
      
    </View>
  )
}

// import { View, Text, TouchableOpacity } from "react-native";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { formSchema } from "../../schemas/formSchema";
// import { useFormStore } from "../../store/FormStore";
// import { useRouter } from "expo-router";

// const featuresList = ["WiFi", "Parking", "Pool", "Gym", "AC", "TV"];

// export default function StepTwo() {
//   const router = useRouter();
//   const { features, setFeatures } = useFormStore();

//   const { handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: zodResolver(formSchema.pick({ features: true })),
//     defaultValues: { features },
//   });

//   const toggleFeature = (feature: string) => {
//     const updatedFeatures = features.includes(feature)
//       ? features.filter((f) => f !== feature)
//       : [...features, feature];

//     setFeatures(updatedFeatures);
//     setValue("features", updatedFeatures);
//   };

//   const onNext = () => router.push("./StepThree");

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//         Select Features:
//       </Text>

//       {featuresList.map((feature) => {
//         const isSelected = features.includes(feature);
//         return (
//           <TouchableOpacity
//             key={feature}
//             onPress={() => toggleFeature(feature)}
//             style={{
//               padding: 12,
//               marginVertical: 6,
//               borderWidth: 2,
//               borderColor: isSelected ? "#000" : "#ccc",
//               backgroundColor: isSelected ? "#000" : "#fff",
//               borderRadius: 10,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: isSelected ? "#fff" : "#000", fontSize: 16 }}>
//               {isSelected ? `✔ ${feature}` : feature}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}

//       {errors.features && (
//         <Text style={{ color: "red", marginTop: 10 }}>
//           {errors.features.message}
//         </Text>
//       )}

//       <TouchableOpacity
//         onPress={handleSubmit(onNext)}
//         style={{
//           marginTop: 20,
//           padding: 12,
//           backgroundColor: "#000",
//           borderRadius: 10,
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ color: "#fff", fontSize: 18 }}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
