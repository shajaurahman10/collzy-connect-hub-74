
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  state: string | null;
  marks: string | null;
  course_interest: string | null;
  created_at: string | null;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // First check localStorage for cached profile
    const cachedProfile = localStorage.getItem('user_profile');
    if (cachedProfile) {
      try {
        const parsedProfile = JSON.parse(cachedProfile);
        // Check if cache is still valid (less than 1 hour old)
        const cacheTime = localStorage.getItem('profile_cache_time');
        const isValidCache = cacheTime && (Date.now() - parseInt(cacheTime)) < 3600000; // 1 hour
        
        if (isValidCache) {
          setProfile(parsedProfile);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing cached profile:', error);
      }
    }

    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
        // Cache the profile data
        localStorage.setItem('user_profile', JSON.stringify(data));
        localStorage.setItem('profile_cache_time', Date.now().toString());
        
        // Store profile cookies for quick access
        document.cookie = `user_name=${data.full_name}; max-age=${60*60*24*365}; path=/`;
        document.cookie = `user_phone=${data.phone || ''}; max-age=${60*60*24*365}; path=/`;
        document.cookie = `user_state=${data.state || ''}; max-age=${60*60*24*365}; path=/`;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile(data);
        // Update cache
        localStorage.setItem('user_profile', JSON.stringify(data));
        localStorage.setItem('profile_cache_time', Date.now().toString());
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const clearProfileCache = () => {
    localStorage.removeItem('user_profile');
    localStorage.removeItem('profile_cache_time');
  };

  return { profile, loading, refetch: fetchProfile, updateProfile, clearProfileCache };
};
