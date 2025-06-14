
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type UserProgress = Tables<'user_progress'>;

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setProfile(null);
      setProgress(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (progressError) {
        console.error('Error fetching progress:', progressError);
      } else {
        setProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return { error };
    }

    await fetchUserData();
    return { error: null };
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_progress')
      .update(updates)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating progress:', error);
      return { error };
    }

    await fetchUserData();
    return { error: null };
  };

  const saveDailyMood = async (mood: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('daily_moods')
      .upsert({
        user_id: user.id,
        mood: mood as any,
        date: new Date().toISOString().split('T')[0]
      });

    if (error) {
      console.error('Error saving mood:', error);
      return { error };
    }

    return { error: null };
  };

  return {
    profile,
    progress,
    loading,
    updateProfile,
    updateProgress,
    saveDailyMood,
    refetch: fetchUserData
  };
};
