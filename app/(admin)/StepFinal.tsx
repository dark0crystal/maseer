// import { useFormStore } from "../../store/FormStore";
// import { createActivity } from '../actions/activity';

// export default function StepFinal() {
//   const { 
//     governorate, 
//     city, 
//     coordinates,
//     // ... other form data from store
//   } = useFormStore();

//   const handleSubmit = async () => {
//     try {
//       const formData = {
//         governorate,
//         city,
//         coordinates,
//         // ... other form data
//       };

//       const result = await createActivity(formData);
      
//       if (result.success) {
//         // Reset form and redirect to success page
//         router.push('/admin/activities');
//       } else {
//         // Handle error
//         console.error(result.error);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   // ... render your form ...
// } 