
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { errorLogger } from '@/utils/errorLogger';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type UserProgress = Tables<'user_progress'>;

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [todayMood, setTodayMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setProfile(null);
      setProgress(null);
      setTodayMood(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        errorLogger.log(profileError, 'fetchProfile', user.id);
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
        errorLogger.log(progressError, 'fetchProgress', user.id);
      } else {
        setProgress(progressData);
      }

      // Fetch today's mood
      const today = new Date().toISOString().split('T')[0];
      const { data: moodData, error: moodError } = await supabase
        .from('daily_moods')
        .select('mood')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (moodError) {
        console.error('Error fetching today mood:', moodError);
        errorLogger.log(moodError, 'fetchTodayMood', user.id);
      } else {
        setTodayMood(moodData?.mood || null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      errorLogger.log(error as Error, 'fetchUserData', user.id);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        errorLogger.log(error, 'updateProfile', user.id);
        return { error: 'Erro ao atualizar perfil' };
      }

      await fetchUserData();
      return { error: null };
    } catch (error) {
      const errorMessage = 'Erro inesperado ao atualizar perfil';
      console.error(errorMessage, error);
      errorLogger.log(error as Error, 'updateProfile', user.id);
      return { error: errorMessage };
    }
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('user_progress')
        .update(updates)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating progress:', error);
        errorLogger.log(error, 'updateProgress', user.id);
        return { error: 'Erro ao atualizar progresso' };
      }

      await fetchUserData();
      return { error: null };
    } catch (error) {
      const errorMessage = 'Erro inesperado ao atualizar progresso';
      console.error(errorMessage, error);
      errorLogger.log(error as Error, 'updateProgress', user.id);
      return { error: errorMessage };
    }
  };

  const saveDailyMood = async (mood: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    console.log('Saving mood:', mood, 'for user:', user.id);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_moods')
        .upsert({
          user_id: user.id,
          mood: mood as any,
          date: today
        }, {
          onConflict: 'user_id,date'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving mood:', error);
        errorLogger.log(error, 'saveDailyMood', user.id);
        return { error: 'Erro ao salvar humor do dia' };
      }

      console.log('Mood saved successfully:', data);
      setTodayMood(mood);
      return { error: null };
    } catch (error: any) {
      console.error('Error in saveDailyMood:', error);
      errorLogger.log(error, 'saveDailyMood', user.id);
      return { error: 'Erro inesperado ao salvar humor' };
    }
  };

  return {
    profile,
    progress,
    todayMood,
    loading,
    updateProfile,
    updateProgress,
    saveDailyMood,
    refetch: fetchUserData
  };
};
