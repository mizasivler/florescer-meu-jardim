
import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RitualStep {
  name: string;
  completed: boolean;
  icon: string;
}

export const useRituals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const completeRitualStep = async (ritualType: string, notes?: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    console.log('Completing ritual step:', ritualType);

    try {
      const { error } = await supabase
        .from('ritual_completions')
        .insert({
          user_id: user.id,
          ritual_type: ritualType,
          notes: notes || null
        });

      if (error) {
        console.error('Error completing ritual:', error);
        throw error;
      }

      // Update user progress
      const { data: currentProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('completed_rituals, flowers_earned')
        .eq('user_id', user.id)
        .single();

      if (!progressError && currentProgress) {
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            completed_rituals: (currentProgress.completed_rituals || 0) + 1,
            flowers_earned: (currentProgress.flowers_earned || 0) + 10
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating progress:', updateError);
        }
      }

      toast({
        title: "Ritual concluído!",
        description: `Parabéns! Você completou o ${ritualType} e ganhou 10 flores! 🌸`
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error in ritual completion:', error);
      toast({
        title: "Erro ao completar ritual",
        description: "Não foi possível salvar o progresso. Tente novamente.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getTodayRitualProgress = async () => {
    if (!user) return { completedSteps: [], totalSteps: 3 };

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('ritual_completions')
        .select('ritual_type')
        .eq('user_id', user.id)
        .gte('completed_at', `${today}T00:00:00.000Z`)
        .lt('completed_at', `${today}T23:59:59.999Z`);

      if (error) {
        console.error('Error fetching today rituals:', error);
        return { completedSteps: [], totalSteps: 3 };
      }

      const completedTypes = data?.map(r => r.ritual_type) || [];
      return { completedSteps: completedTypes, totalSteps: 3 };
    } catch (error) {
      console.error('Error in getTodayRitualProgress:', error);
      return { completedSteps: [], totalSteps: 3 };
    }
  };

  return {
    completeRitualStep,
    getTodayRitualProgress,
    loading
  };
};
