

import { supabase } from '@/lib/supabase'

export async function createActivity(formData: any) {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('Not authenticated')
    }

    // Create the activity in the database
    const { data: activity, error } = await supabase
      .from('activities')
      .insert({
        organizer_id: user.id,
        governorate: formData.governorate,
        city: formData.city,
        latitude: formData.coordinates.latitude,
        longitude: formData.coordinates.longitude,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        activity_type: formData.activityType,
        features: formData.features
      })
      .select()
      .single()
    
    if (error) throw error

    return { success: true, activity }
  } catch (error) {
    console.error('Error creating activity:', error)
    return { success: false, error: 'Failed to create activity' }
  }
} 