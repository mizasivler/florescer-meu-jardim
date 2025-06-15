
import { useState } from 'react';
import { useAuth } from './useAuth';
import { useUserData } from './useUserData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingData {
  name?: string;
  initialMood?: string;
  menopauseType?: string;
}

export const useOnboarding = () => {
  const { user } = useAuth();
  const { updateProfile, refetch } = useUserData();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const completeOnboarding = async (data: OnboardingData) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    console.log('Completing onboarding with data:', data);

    try {
      // Update profile with onboarding data
      const { error: profileError } = await updateProfile({
        name: data.name || user.user_metadata?.name || 'Usuário',
        initial_mood: data.initialMood,
        menopause_type: data.menopauseType,
        onboarding_completed: true
      });

      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
      }

      // Save initial mood if provided
      if (data.initialMood) {
        const { error: moodError } = await supabase
          .from('daily_moods')
          .upsert({
            user_id: user.id,
            mood: data.initialMood as any,
            date: new Date().toISOString().split('T')[0]
          });

        if (moodError) {
          console.error('Error saving initial mood:', moodError);
          // Don't throw here, mood is not critical
        }
      }

      await refetch();
      
      toast({
        title: "Onboarding concluído!",
        description: "Bem-vinda ao Florescer 21. Sua jornada de transformação começou!"
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Erro no onboarding",
        description: "Não foi possível completar o onboarding. Tente novamente.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    completeOnboarding,
    loading
  };
};
