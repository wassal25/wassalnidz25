
import { supabase } from './client';

/**
 * Configure Supabase Storage buckets for profile photos
 * Call this function once during application initialization
 */
export const setupStorage = async () => {
  try {
    // Check if avatars bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const avatarBucketExists = buckets?.some(bucket => bucket.name === 'avatars');
    
    if (!avatarBucketExists) {
      const { error } = await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 1024 * 1024 * 2 // 2MB
      });
      
      if (error) {
        console.error('Error creating avatars bucket:', error);
      } else {
        console.log('Created avatars bucket successfully');
      }
    }
  } catch (error) {
    console.error('Error setting up storage:', error);
  }
};
