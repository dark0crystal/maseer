// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function BookingButton({ activityId }: { activityId: string }) {
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleBooking = async () => {
//     setLoading(true)
//     try {
//       // Add your booking logic here
//       const response = await fetch('/api/bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ activityId }),
//       })

//       if (!response.ok) {
//         throw new Error('Failed to book activity')
//       }

//       router.push('/bookings')
//     } catch (error) {
//       console.error('Booking error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <button
//       onClick={handleBooking}
//       disabled={loading}
//       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//     >
//       {loading ? 'Booking...' : 'Book Now'}
//     </button>
//   )
// } 